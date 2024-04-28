<template>
    <div id="terminal" ref="terminal"></div>
</template>
<script>
import { Terminal } from "xterm"
import { FitAddon } from 'xterm-addon-fit'
import "xterm/css/xterm.css"
export default {
    data() {
        return {
            term: "", // 保存terminal实例
            rows: 40,
            cols: 100,
            websock: null,
        }
    },
    created() {
        this.initWebSocket();
    },
    destroyed() {
        this.websock.close() //离开路由之后断开websocket连接
    },
    mounted() {
        this.initXterm()
    },
    methods: {
        initXterm() {
            let _this = this
            let term = new Terminal({
                rendererType: "canvas", //渲染类型
                rows: _this.rows, //行数
                cols: _this.cols, // 不指定行数，自动回车后光标从下一行开始
                convertEol: true, //启用时，光标将设置为下一行的开头
                // scrollback: 50, //终端中的回滚量
                disableStdin: false, //是否应禁用输入
                // cursorStyle: "underline", //光标样式
                cursorBlink: true, //光标闪烁
                theme: {
                    foreground: "#ECECEC", //字体
                    background: "#000000", //背景色
                    cursor: "help", //设置光标
                    lineHeight: 20
                }
            })
            // 创建terminal实例
            term.open(this.$refs["terminal"])
            // 换行并输入起始符 $
            term.prompt = () => {
                term.write("\r\n\x1b[33m$\x1b[0m ")
            }
            // term.prompt()
            // canvas背景全屏
            const fitAddon = new FitAddon()
            term.loadAddon(fitAddon)
            fitAddon.fit()

            window.addEventListener("resize", resizeScreen)
            function resizeScreen() {
                try { // 窗口大小改变时，触发xterm的resize方法使自适应
                    fitAddon.fit()
                } catch (e) {
                    console.log("e", e.message)
                }
            }
            _this.term = term
            _this.runFakeTerminal()
        },
        runFakeTerminal() {
            let _this = this
            let term = _this.term
            if (term._initialized) return
            // 初始化
            term._initialized = true
            term.writeln("Welcome to \x1b[1;32m My Graduation_design\x1b[0m.")
            term.writeln('This is Web Terminal about Kali-Liunx; Good Good Study, Day Day Up.')
            // term.prompt()
            let shellCommand = "";
            // 添加事件监听器，支持输入方法
            term.onKey(e => {

                const printable = !e.domEvent.altKey && !e.domEvent.altGraphKey && !e.domEvent.ctrlKey && !e.domEvent.metaKey
                if (e.domEvent.keyCode === 13) {
                    console.log(shellCommand)
                    if (shellCommand === 'XTERMCLEAR') {
                        term.writeln("\r");
                        term.clear();  // 清空终端内容
                        shellCommand = "";
                    } else {
                        let actions = {
                            "operate": "command",
                            "command": shellCommand + "\r",
                            "host": "192.168.44.128",
                            "port": "22",
                            "username": "msfadmin",
                            "password": "msfadmin"
                        }
                        this.websocketsend(JSON.stringify(actions))
                        term.writeln("\r");
                        shellCommand = "";
                    }
                    // term.prompt()

                } else if (e.domEvent.keyCode === 8) {// back 删除的情况
                    if (term._core.buffer.x > 2) {
                        term.write('\b \b')
                        shellCommand = shellCommand.slice(0, shellCommand.length - 1)
                        console.log("删除1位")
                        console.log(shellCommand)
                    }
                } else if (printable) {
                    shellCommand = shellCommand + e.key;
                    term.write(e.key)
                }

            })
            term.onData(key => {  // 粘贴的情况
                if (key.length > 1) term.write(key)
            })
        },
        initWebSocket() { //初始化weosocket
            const wsuri = "ws://127.0.0.1:80/webssh";
            const token = localStorage.getItem('token');
            const socket = new WebSocket(wsuri, [token.slice(8, token.length - 1)]);
            socket.binaryType = 'arraybuffer';
            socket.onmessage = this.websocketonmessage;
            socket.onopen = this.websocketonopen;
            socket.onerror = this.websocketonerror;
            socket.onclose = this.websocketclose;
            this.websock = socket;
        },
        websocketonopen() { //连接建立之后执行send方法发送数据
            let actions = {
                "operate": "connect",
                "command": "command",
                "host": "192.168.44.128",
                "port": "22",
                "username": "msfadmin",
                "password": "msfadmin"
            };
            this.websocketsend(JSON.stringify(actions));
        },
        websocketonerror(e) {//连接建立失败重连
            this.term.write(e)
            this.initWebSocket();
        },
        websocketonmessage(e) { //数据接收
            const decoder = new TextDecoder('utf-8');
            const text = decoder.decode(e.data);
            this.term.write(text)

        },
        websocketsend(Data) {//数据发送
            if (this.websock.readyState === WebSocket.OPEN) {
                this.websock.send(Data);
            } else {
                console.log("WebSocket连接未打开,重连中\r")
                this.term.write("WebSocket连接未打开,重连中\r")
                this.websock.close();
                this.initWebSocket();
                this.term.write("重连成功\r")
            }
        },
        websocketclose() {  //关闭
            this.term.write("断开连接\r")
        },

    }
}
</script>