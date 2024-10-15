import fs from 'fs';
import dayjs from 'dayjs';
import path from 'path';
import dotenv from "dotenv";
dotenv.config();

export const getDate = async () : Promise<string|null> => {
    try{

        if(!process.env.GITHUB_USERNAME || !process.env.REPO_NAME)
        {
            throw Error('Gihub Username or Repository Name Environment Empty');
        }
    
        const layoutPath = path.join(process.cwd(),'LAYOUT.txt');
        const repositoryPath = path.join('repositories', process.env.GITHUB_USERNAME , process.env.REPO_NAME);
        if(!fs.existsSync(repositoryPath) || !fs.existsSync(layoutPath))
        {
            console.log('Repository or LAYOUT file Path Not Found');
            throw Error('Repository or LAYOUT file Path Not Found');
        }
    
        let layoutContent = fs.readFileSync(layoutPath,'utf-8');
        let content = fs.readFileSync(`${repositoryPath}/README.md`,'utf-8');
        
        let date = await extractDateFromReadme(content,layoutContent);

        return date;
    }catch(error)
    {
        return null;
    }
};

const extractDateFromReadme = async (readmeContent: string, layoutTemplate: string): Promise<string|null> => {
    const layoutPattern = layoutTemplate.replace('${date}', '(\\d{4}-\\d{2}-\\d{2})'); // Assuming date format is YYYY-MM-DD
    const regex = new RegExp(layoutPattern);
    
    const match = readmeContent.match(regex);

    if (match && match[1]) {
        return match[1];
    }
    
    return null;
}

export const writeReadme = async () : Promise<Boolean> => {
    try{
        const date : string = dayjs().format('YYYY-MM-DD');
        if(await getDate() === date)
        {
            console.log('Doesnt need to rewrite readme');
            return true;
        }

        if(!process.env.GITHUB_USERNAME || !process.env.REPO_NAME)
        {
            throw Error('Gihub Username or Repository Name Environment Empty');
        }
    
        const layoutPath = path.join(process.cwd(),'LAYOUT.txt');
        const repositoryPath = path.join('repositories', process.env.GITHUB_USERNAME , process.env.REPO_NAME);
        if(!fs.existsSync(repositoryPath) || !fs.existsSync(layoutPath))
        {
            console.log('Repository or LAYOUT file Path Not Found');
            throw Error('Repository or LAYOUT file Path Not Found');
        }
    
        console.log(`Rewrite Readme Date to ${date}`);
        let layoutContent = fs.readFileSync(layoutPath,'utf-8');
        layoutContent = layoutContent.replace('${date}',date);
        fs.writeFileSync(`${repositoryPath}/README.md`, layoutContent, 'utf-8');
        console.log(`Rewrite Readme Completed...`);

        return true;
    }catch(error){
        console.log(error);
        return false;
    }

}; 