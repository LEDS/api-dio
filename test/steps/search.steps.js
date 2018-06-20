import { Given, When, Then } from 'cucumber';
import assert from 'assert';
import request from 'supertest';
import { AppController } from './../../src/app.controller';

// Dado que a data é '11/09/2018'
// Implement with the following snippet:
Given('que a data é {string}', async function(string) {
  this.data = string;
});

// Quando o usuario pesquisar
// Implement with the following snippet:
When('o usuario pesquisar', async function() {
  return 0;
  //this.resp = await request(AppController).get('/news');
});

// Então retorna as noticias
// Implement with the following snippet:
Then('retorna as noticias', function() {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

// Então retorna vazio
// Implement with the following snippet:
Then('retorna vazio', function() {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

// Então retorna um erro de data
// Implement with the following snippet:
Then('retorna um erro de data', function() {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});
