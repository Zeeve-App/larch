import multer from 'multer';
import {storage} from '../utils/multer.storage.js'
import {fileFilter} from '../utils/multer.filter.js'
export const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
})