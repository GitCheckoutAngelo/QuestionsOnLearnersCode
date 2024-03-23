import axios from "axios";
import { Program } from "../models/ProgramFile";
import { SERVER } from "../utils/config/server";

export const getProgramByIdAsync = async (id: string): Promise<Program | null> => {
    const res = (await axios.get(`${SERVER.PROGRAM_ENDPOINT}${id}`));
    if (res.status === 200) {
        const contentType = res.headers['content-type'];
        const fileName = getFileName(res.headers['content-disposition']);
    
        const blob = new Blob([res.data], { type: contentType });
        const file = new File(
            [blob], 
            fileName ? fileName : 'default_name',
            { type: contentType }
        );
    
        const program: Program = {
            _id: res.headers['x-id'],
            authorId: res.headers['x-author-id'],
            file: file,
        };
    
        return program;
    }
    else {
        return null;
    }
}

const getFileName = (contentDisposition: string) => {
    return contentDisposition.split('=').pop();
}