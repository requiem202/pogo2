var express = require('express'),
    pogobuf = require('pogobuf'),
    jsonfile = require('jsonfile');

var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'POGO2' });
});
router.post('/', function(req, res) {
  var account = req.body.account,
      username = req.body.username,
      password = req.body.password,
      login,
      list = [];

  if (req.body.account === 'ptc') {
      login = new pogobuf.PTCLogin();
  } else {
      login = new pogobuf.GoogleLogin();
  }
  var client = new pogobuf.Client();

  jsonfile.readFile('pokedex.json', function(err, pokedex) {
    //   console.dir(pokedex);
    login.login(username, password)
    .then(token => {
      if (req.body.account === 'ptc') {
          client.setAuthInfo('ptc', token);
      } else {
          client.setAuthInfo('google', token);
      }
      return client.init();
    }).then(() => {
        return client.getInventory(0);
    }).then(inventory => {
    //console.log(inventory);
    for(var i = 0; i<inventory.inventory_delta.inventory_items.length; i++)
    {
        if (inventory.inventory_delta.inventory_items[i].inventory_item_data.pokemon_data != null
        && inventory.inventory_delta.inventory_items[i].inventory_item_data.pokemon_data.cp > 0) {
            // console.log(inventory.inventory_delta.inventory_items[i].inventory_item_data.pokemon_data);
            // count++;
            //if (inventory.inventory_delta.inventory_items[i].inventory_item_data.pokemon_data.pokemon_id == 69){
            // if (inventory.inventory_delta.inventory_items[i].inventory_item_data.pokemon_data.cp == 638
            // || inventory.inventory_delta.inventory_items[i].inventory_item_data.pokemon_data.cp == 479){
            //     console.log(inventory.inventory_delta.inventory_items[i].inventory_item_data.pokemon_data);
            // }
            var name = '';
            var pokemon = inventory.inventory_delta.inventory_items[i].inventory_item_data.pokemon_data;
            var iv = Math.round(((pokemon.individual_attack + pokemon.individual_defense + pokemon.individual_stamina) / 45) *100);
            for (var j=0;j<pokedex.length;j++ ) {
                if (pokedex[j].Number == pokemon.pokemon_id) {
                    name = pokedex[j].Name;
                    break;
                }
            }
            var result = {
                pokemon_id: pokemon.pokemon_id,
                name: name,
                cp: pokemon.cp,
                iv: iv,
                iv_atk: pokemon.individual_attack,
                iv_def: pokemon.individual_defense,
                iv_sta: pokemon.individual_stamina,

            };
            list.push(result);
        }
    }

    // for(var i = 0; i<list.length; i++)
    // {
    //   //console.log(list[i]);
    //   //var pokemon = list[i];
    //   //file.write('name: ' + pokemon.name + ', cp: ' + pokemon.cp + ', iv: ' + pokemon.iv + '\r\n');
    // }

      res.render('result', { username: username, data: list });
    });
});
});

module.exports = router;
