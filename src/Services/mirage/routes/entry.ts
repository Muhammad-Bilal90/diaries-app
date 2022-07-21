import { Request , Response} from 'miragejs';
import { handleErrors } from '../server';
import { Diary } from '../../../Interfaces/diary.interface';
import { Entry } from '../../../Interfaces/entry.interface';
import dayjs from 'dayjs';

interface EntryResponse {
    entry: Entry,
    diary: Diary
}

export const addEntry = (schema: any, req: Request): EntryResponse | Response => {
    try{
        const { title, content, diaryId } = JSON.parse(req.requestBody) as Partial<Entry>;
        const diary = schema.diaries.findBy( {id: diaryId});
        const now = dayjs().format();
        const entry = diary.createEntry({
            title,
            content,
            createdAt: now,
            updatedAt: now,
        });
        diary.update({
            ...diary.attrs,
            updatedAt: now,
        });

        return{
            diary: diary.attrs,
            entry: entry.attrs,
        };
    } catch(error){
        return handleErrors(error, "Failed to save entry");
    }
}

export const removeEntry = (schema: any, req: Request): Diary | Response => {
    try{
        const entry = schema.entries.find(req.params.entryId);
        let diaryId = entry.diaryId;
        entry.destroy();
        const diary = schema.diaries.find(diaryId);
        return diary.attrs as Diary
    } catch(error){
        return handleErrors(error, "Could not remove entry");
    }
}

export const updateEntry = (schema: any, req: Request): Entry | Response => {
    try{
        const entry = schema.entries.find(req.params.id);
        const data = JSON.parse(req.requestBody) as Partial<Entry>;
        const now = dayjs().format();
        
        entry.update({
            ...data,
            updatedAt: now,
        });

        return entry.attrs as Entry;
    } catch(error){
        return handleErrors(error, "Failed to update entry");
    }
}

export const getEntries = (schema: any, req: Request): Entry[] | Response => {
    try{
        const diary = schema.diaries.find(req.params.id);
        
        return diary.entry as Entry[]
    } catch(error){
return handleErrors(error, "Failed to get your entries");
    }
}