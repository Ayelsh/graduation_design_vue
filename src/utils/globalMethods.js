export const loadImageGlobal = async function(avatar, axiosInstance) {
    const filename = avatar; // 图片文件名
    return await axiosInstance.get(`/File/${filename}`, { responseType: 'blob' })
        .then(response => {
            const blob = new Blob([response], { type: 'image/jpeg' });
            const imageUrl = URL.createObjectURL(blob);
            // console.log("imageUrl:", imageUrl)
            return imageUrl;
        })
        .catch(error => {
            console.error('Error loading image:', error);
            return null;
        });
};
export default{
    loadImageGlobal

}