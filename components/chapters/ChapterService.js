const chapterModel = require("./ChapterModel")
//note:
/*
upload lên firebase để lấy link về,
link là string
dùng foreach để link ảnh về dạng object
{
    "id":"1",
    "page_image":"link page"
}
xong vòng lập gọi api để up lên server


khi cập nhật một chapter mới thì  thay đổi luôn ngày cập nhật 
bên manga model
*/
const addChapter = async (title, chapter_number, page, date) =>{
try {
    const newChapter = {
        title,
        chapter_number,
        page,
        date
    }
    await chapterModel.create(newChapter);
    return true;
} catch (error) {
    console.log('Add Chapter Service error'+error)
}
return false;
}


module.exports = {addChapter}