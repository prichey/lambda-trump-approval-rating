const fetch = require('node-fetch');
const moment = require('moment');
const csv = require('csvtojson');

const CSV_URL =
  'https://projects.fivethirtyeight.com/trump-approval-data/approval_topline.csv';

function parseTimestamp(timestamp) {
  return moment(new Date(timestamp));
}

function getAllPollDataFromCSV(data) {
  return new Promise((resolve, reject) => {
    const rows = [];

    csv()
      .fromString(data)
      .on('json', row => {
        if (row.subgroup === 'All polls') {
          rows.push(row);
        }
      })
      .on('done', () => {
        resolve(rows);
      })
      .on('error', err => {
        reject(err);
      });
  });
}

exports.handler = async (event, context, callback) => {
  try {
    const page = await fetch(CSV_URL).then(res => res.text());
    const allPolls = await getAllPollDataFromCSV(page);
    const mostRecentPoll = allPolls[0];
    const approval = mostRecentPoll.approve_estimate;
    const timestamp = parseTimestamp(mostRecentPoll.timestamp);

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        rating: approval,
        timestamp: timestamp
      })
    });
  } catch (err) {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify(err)
    });
  }
};
