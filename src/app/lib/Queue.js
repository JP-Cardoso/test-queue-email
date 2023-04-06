import Queue from 'bull';
import redisConfig from '../../config/redis';

import * as jobs from '../job';

const queue = Object.values(jobs).map(job => ({
    bull: new Queue(job.key, redisConfig),
    name: job.key,
    handle: job.handle
}))

export default {
    queue,
    add(name, data) {
        const queue = this.queue.find(queue => queue.name === name);
        return queue.bull.add(data);
    },
    process() {
        return this.queue.forEach(queue => {
            queue.bull.process(queue.handle);

            queue.bull.on('failed', (job, err) => {
                console.log('job failed', queue.key, job.data);
                console.error(err)
            });
        })
    }
}

// import RegistrationMail from '../job/RegisrationMail';

// const mailQueue = new Queue(RegistrationMail.key, redisConfig);

// mailQueue.on('failed', (job, err) => {
//     console.log('job failed', job.name, job.data);
//     console.error(err);
// });

// export default mailQueue;