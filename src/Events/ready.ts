import { Event } from '../Interfaces/Event';

export const event: Event = {
    name: 'ready',
    run: (client) => {
        console.log(`${client.user.tag} is online!`);
    }
}