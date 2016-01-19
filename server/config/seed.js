/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Way from '../api/way/way.model';

Way.find({}).removeAsync()
  .then(() => {
    Way.create(
      { name: 'Walk', votes: 200 },
      { name: 'Cycle', votes: 30 },
      { name: 'Car', votes: 259 },
      { name: 'Train', votes: 28 },
      { name: 'Motorbike', votes: 4 },
      { name: 'Tram', votes: 13 },
      { name: 'Other', votes: 2 }
    );
  });

