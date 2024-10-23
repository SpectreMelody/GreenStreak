import { getDate, writeReadme } from "./utilities/activities-changer";
import dayjs from 'dayjs';
import { checkRepositoryExists, cloneRepository, commitAndPushChange, createRepository, pullRepository, setGlobalConfig, stashChanges } from "./utilities/git-utilities";

( async() => {
    const date = await getDate();
    const currentDate = dayjs().format('YYYY-MM-DD');
    if(date != currentDate)
    {
        const repositoryExists = await checkRepositoryExists();
        
        if(!repositoryExists)
        {
            await createRepository();
            await cloneRepository();
        }
        
        await setGlobalConfig();
        await stashChanges();
        await pullRepository();
        await writeReadme(currentDate);
        await commitAndPushChange();
    }
})();