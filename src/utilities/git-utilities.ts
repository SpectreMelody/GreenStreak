import axios from "axios";
import dotenv from "dotenv";
import path from 'path';
import fs from 'fs';
import { IRepository } from "../interfaces/irepository";
import simpleGit from 'simple-git';
import { exec } from "child_process";

dotenv.config();
const git = simpleGit();

export const setGlobalConfig = async() : Promise<Boolean> => {
    try{
        const GITHUB_USERNAME = process.env.GITHUB_USERNAME ?? '';
        const GITHUB_EMAIL = process.env.GITHUB_EMAIL ?? '';

        console.log('Set Global Config');

        exec(`git config --global user.name "${GITHUB_USERNAME}"`, (err : any) => {
            if (err) {
                console.error(`Error setting git user.name: ${err.message}`);
                return;
            }
            console.log(`Git user.name set to: ${GITHUB_USERNAME}`);
        });
    
        exec(`git config --global user.email "${GITHUB_EMAIL}"`, (err : any) => {
            if (err) {
                console.error(`Error setting git user.email: ${err.message}`);
                return;
            }
            console.log(`Git user.email set to: ${GITHUB_EMAIL}`);
        });
        console.log('Set Global Config Successfully...')

        return true;
    }catch(error)
    {
        return false;
    }
};

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

        console.log(`Failed Create Repository :: ${error}`)

        return data;
    }
};

export const cloneRepository = async() : Promise<Boolean> => {
    try{
        if(!process.env.GITHUB_USERNAME || !process.env.REPO_NAME)
        {
           throw Error('Gihub Username or Repository Name Environment Empty');
        }

        const repositoryPath = path.join('repositories', process.env.GITHUB_USERNAME , process.env.REPO_NAME);
        
        if(!fs.existsSync(repositoryPath))
        {
            const token = process.env.GITHUB_TOKEN;
            const username = process.env.GITHUB_USERNAME;
            const repoName = process.env.REPO_NAME;
            const remote = `https://${username}:${token}@github.com/${username}/${repoName}.git`;

            console.log('Cloning repository...');
            await git.clone(remote, repositoryPath);
            console.log('Repository Cloned Successfully...');
        }

        return true;
    }catch(error){    
        console.log(`Failed Clone Repository :: ${error}`)    
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

        const token = process.env.GITHUB_TOKEN;
        const username = process.env.GITHUB_USERNAME;
        const repoName = process.env.REPO_NAME;
        const remote = `https://${username}:${token}@github.com/${username}/${repoName}.git`;

        console.log('Setting remote URL...');
        await git.cwd(repositoryPath).remote(['set-url', 'origin', remote]);

        console.log('Pulling repository...');
        await git.cwd(repositoryPath).pull('origin', 'main');
        console.log('Repository pulled successfully');

        return true;
    }catch(error)
    {
        console.log(`Failed Pulling Repository :: ${error}`)
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
        await git.cwd(repositoryPath).commit(`Update README.md with today's date`);
        console.log('Commit Changes Successfully');

        console.log('Push Changes...');
        await git.cwd(repositoryPath).push('origin', 'main');
        console.log('Push Changes Successfully...');

        return true;
    }catch(error)
    {
        console.log(`Failed Commit and Push :: ${error}`)
        return false;
    }
};

export const stashChanges = async (message?: string): Promise<void> => {
    try {
        if(
            !process.env.GITHUB_USERNAME || 
            !process.env.REPO_NAME
        )
        {
            throw Error('Gihub Username or Repository Name Environment Empty');
        }

        const repositoryPath = path.join('repositories', process.env.GITHUB_USERNAME , process.env.REPO_NAME);
        if (message) {
            
            await git.cwd(repositoryPath).stash(['push', '-m', message]);
            console.log(`Stashed with message: "${message}"`);
        } else {
            await git.cwd(repositoryPath).stash();
            console.log('Stashed without message');
        }
    } catch (error) {
        console.log(`Failed to Stash Changes :: ${error}`)
    }
};