import {Client, expect} from '@loopback/testlab';
import {BootStrap} from '../..';
import {setupApplication} from './test-helper';

let id: number;
describe('UsersController', () => {
  let app: BootStrap;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /users', async () => {
    const res = await client.get('/users').expect(200);
    expect(res.body).to.Array();
  });

  it('invokes POST /users', async () => {
    const res = await client.post('/users')
      .send({
        "firstName": "string",
        "lastName": "string",
        "middleName": "string",
        "phoneNumber": "string",
        "email": "string@test.com",
        "address": "string",
        "role": "admin"
      })
      .expect(200);
    id = res.body.id
    expect(res.body).to.ownProperty('id');
  });

  it('invokes PUT /users', async () => {
    await client.patch(`/users/${id}`)
      .send({"firstName": "testname", })
      .expect(204);
  });

  it('invokes DELETE /users', async () => {
    await client.delete(`/users/${id}`).expect(204);
  });

});
