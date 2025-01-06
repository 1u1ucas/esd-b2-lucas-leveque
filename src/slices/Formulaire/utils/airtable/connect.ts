import Airtable from "airtable";

const connectAirtable = () => {

  Airtable.configure({
    apiKey: 'patr99vfN5uvSMKBe.2d5c4518f1c8dbdc02bb6087ab9001808e6db37454a4c69dbd2895326fa3c1d9',
  });


  const airtableBase = Airtable.base('appMLXyHPtnLniJnP');

  return airtableBase;
};

export default connectAirtable;