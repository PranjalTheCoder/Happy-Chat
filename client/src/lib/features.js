import moment from "moment";

const fileFormat = (url) => {
// export { smapleNotifications, sampleMessages }
    const fileExt = url.split(".").pop();
    if(fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg") return "video";
    if(fileExt === "mp3" || fileExt === "wav") return "audio";
    if(fileExt === "pdf") return "pdf";
    if(fileExt === "doc" || fileExt === "docx") return "doc";
    if(fileExt === "xls" || fileExt === "xlsx") return "xls";
    if(fileExt === "ppt" || fileExt === "pptx") return "ppt";
    if(fileExt === "txt") return "txt";
    if(fileExt === "zip" || fileExt === "rar") return "zip";
    if(fileExt === "jpg" || fileExt === "jpeg" || fileExt === "png" || fileExt === "gif") return "image";
    return "file";
};

// eslint-disable-next-line no-unused-vars
const transformImage = (url ="", width=100 )=> {
  const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);
  return newUrl;
};


const getLast7Days = () => {
    const currentDate = moment();
    const last7Days = [];
    
    for (let i = 0; i < 7; i++) {
      const dayDate = currentDate.clone().subtract(i, "days");
      last7Days.unshift(dayDate.format("YYYY-MM-DD")); // Format to desired date format
    }
    
    return last7Days;
  };
  const getOrSaveFromStorage = ({ key, value, get }) => {
    if (get)
      return localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key))
        : null;
    else localStorage.setItem(key, JSON.stringify(value));
  };
  
  export { fileFormat, transformImage, getLast7Days, getOrSaveFromStorage };