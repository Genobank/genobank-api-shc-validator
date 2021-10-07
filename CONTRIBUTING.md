### Deployment

```sh
$ nvm use 14
$ npm i
$ npm run build
$ npm run deploy -- --stage test
$ npm run deploy -- --stage production
```

We can remove an already deployed lambda function:

```sh
$ npm run deploy:remove -- --stage test
$ npm run deploy:remove -- --stage production
```
