
const ucapan = () =>{
    let jam = new Date().getHours();
    var hasil = "";
    if (jam > 3 && jam <  12) hasil = "Pagi"; 
    if (jam > 11 && jam <  18) hasil ="Siang"; 
    if (jam > 17 && jam <  24) hasil = "Malam"; 
    return hasil; 
}


module.exports = {ucapan}