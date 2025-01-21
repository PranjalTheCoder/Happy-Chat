import multer from "multer";


// multer ke andar hm storage bhi de skte hai 
// multer ({__storage__}) which is a memory or disk
// memory mtlb RAM jo ki temporary or fast hogi
// Disk Storage Hard Disk jo ki isi folder me hogi 
// but hme chahiye temporary data jo ki hm cloudinary pr store kr dege
// aur disk se data delete kr dege.
// default storage disk storage he hoti hai
const multerUpload = multer({
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
  });
  
  const singleAvatar = multerUpload.single("avatar");
  const attachmentsMulter = multerUpload.array("files", 5);

 export  { singleAvatar, attachmentsMulter };