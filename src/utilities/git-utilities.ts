import axios from "axios";
import dotenv from "dotenv";
import path from 'path';
import fs from 'fs';
import { IRepository } from "../interfaces/irepository";
import simpleGit from 'simple-git';

dotenv.config();
const git = simpleGit();

export const checkRepositoryExists = async () : Promise<Boolean> => {
    try{
        console.log('Checking Repository...')
        let response = await axios.get(`https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.REPO_NAME}`, {
            headers: {
              Authorization: `token ${process.env.GITHUB_TOKEN}`,
              Accept: 'application/json',
            },
        });

        console.log(`Checking Repository Success With Result :: ${(response.status == 200) ? 'Exists' : 'Not Found'}`);

        return response.status == 200;
    }catch(error)
    {
        return false
    }
};

export const createRepository = async () : Promise<IRepository> => {
    try{
        if(await checkRepositoryExists())
        {
            let data : IRepository = {
                status : 200,
                message : 'Repository Exists'
            };
    
            return data;
        }

        console.log('Creating Repository...');

        await axios.post(
            'https://api.github.com/user/repos',
            {
              name: process.env.REPO_NAME,
              private: process.env.REPO_PRIVATE,
              auto_init: true,
            },
            {
              headers: {
                Authorization: `token ${process.env.GITHUB_TOKEN}`,
                Accept: 'application/json',
              },
            }
        );

        console.log('Repository Created Successfully...');

        let data : IRepository = {
            status : 200,
            message : 'Repository Created'
        };

        return data;
    }catch(error){
        let data : IRepository = {
            status : 404,
            message : String(error)
        };

        return data;
    }
};

export const cloneRepository = async() : Promise<Boolean> => {
    try{
        if(!process.env.GITHUB_USERNAME || !process.env.REPO_NAME)
        {
           throw Error('Gihub Username or Repository Name Environment Empty');
        }

        await createRepository();

        const repositoryPath = path.join('repositories', process.env.GITHUB_USERNAME , process.env.REPO_NAME);
        
        if(!fs.existsSync(repositoryPath))
        {
            console.log('Cloning repository...');
            await git.clone(`https://github.com/${process.env.GITHUB_USERNAME}/${process.env.REPO_NAME}.git`, repositoryPath);
            console.log('Repository Cloned Successfully...');
        }

        return true;
    }catch(error){        
        return false;
    }
}

export const pullRepository = async() : Promise<Boolean> => {
    try{
        if(!process.env.GITHUB_USERNAME || !process.env.REPO_NAME)
        {
            throw Error('Gihub Username or Repository Name Environment Empty');
        }

        const repositoryPath = path.join('repositories', process.env.GITHUB_USERNAME , process.env.REPO_NAME);
        if(!fs.existsSync(repositoryPath))
        {
            await cloneRepository();
        }

        console.log('Pull Repository...');
        await git.cwd(repositoryPath).pull();
        console.log('Pull Repository Successfully...');

        return true;
    }catch(error)
    {
        return false;
    }
}

export const commitAndPushChange = async() : Promise<Boolean> => {
    try{
        if(
            !process.env.GITHUB_USERNAME || 
            !process.env.REPO_NAME
        )
        {
            throw Error('Gihub Username or Repository Name Environment Empty');
        }

        const repositoryPath = path.join('repositories', process.env.GITHUB_USERNAME , process.env.REPO_NAME);
        console.log('Add Changes...');
        await git.cwd(repositoryPath).add('README.md');
        console.log('Add Changes Succesfully...');

        console.log('Commit Changes...');
        await git.commit(`Update README.md with today's date`);
        console.log('Commit Changes Successfully');

        console.log('Push Changes...');
        await git.push('origin', 'main');
        console.log('Push Changes Successfully...');

        return true;
    }catch(error)
    {
        return false;
    }
};