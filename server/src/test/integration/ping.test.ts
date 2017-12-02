import * as Code from 'code';
import * as Lab from 'lab';
import server from '../../server';

const lab = exports.lab = Lab.script();

lab.experiment('ping', () => {
    lab.test('Should return pong', async () => {
        const options = {
            method: 'GET',
            url: '/api/1.0/ping',
        };

        const response = await server.inject(options);
        Code.expect(response.statusCode).to.equal(200);
        Code.expect(response.payload).to.equal('pong');
    });
});

