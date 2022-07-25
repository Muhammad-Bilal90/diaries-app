import { Server, Model, Factory, hasMany, belongsTo, Response } from 'miragejs';
import * as user from './routes/user';
import * as diary from './routes/diary';
import * as entry  from "./routes/entry";

export const handleErrors = (error: any, message = 'An Error ocurred') => {
    return new Response(400, undefined, {
        data: {
            message,
            isError: true,
        },
    });
}

export const setupServer = (env?: string): Server => {
    return new Server({
        environment: env ?? 'development',

        models: {
            entry: Model.extend({
                diary: belongsTo(),
            }),
            diary: Model.extend({
                entry: hasMany(),
                user: belongsTo(),
            }),
            user: Model.extend({
                diary: hasMany(),
            }),
        },

        factories: {
            user: Factory.extend({
                username: 'bilal',
                password: 'bilal10',
                email: 'bilal@email.com'
            }),
        },

        seeds: (server): any => {
            server.create('user')
        },

        routes(): void {
            this.urlPrefix = 'https://diaries.app';
            // this.namespace = 'api'
            
            this.get('/diaries/entries/:id', entry.getEntries);
            this.get('/diaries/:id', diary.getDiaries);

            this.post('/auth/login', user.login);
            this.post('/auth/signup', user.signup);

            this.post('/diaries/', diary.create);
            this.post('/diaries/entry/', entry.addEntry);

            this.put('/diaries/:id', diary.updateDiary);
            this.put('/diaries/entry/:id', entry.updateEntry);

            this.delete('/diaries/:id', diary.removeDiary);
            this.delete('/diaries/entries/:id/:id1', entry.removeEntry);

            this.pretender.get('/1/index*', this.pretender.passthrough);
            this.pretender.post('/1/index*', this.pretender.passthrough);
            this.pretender.put('/1/index*', this.pretender.passthrough);
            this.pretender.delete('/1/index*', this.pretender.passthrough);
        }
    })
}