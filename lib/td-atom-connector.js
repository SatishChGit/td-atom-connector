'use babel';

import TdAtomConnectorView from './td-atom-connector-view';
import { CompositeDisposable } from 'atom';
import { TeradataConnection } from 'teradata-nodejs-driver';
//var TeradataConnection = require("teradata-nodejs-driver/teradata-connection");
//import { TeradataConnection } from 'teradata-nodejs-driver/teradata-connection';

export default {

  tdAtomConnectorView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.tdAtomConnectorView = new TdAtomConnectorView(state.tdAtomConnectorViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.tdAtomConnectorView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'td-atom-connector:connect': () => this.connect()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.tdAtomConnectorView.destroy();
  },

  serialize() {
    return {
      tdAtomConnectorViewState: this.tdAtomConnectorView.serialize()
    };
  },

  connect() {
    console.log('TdAtomConnector was toggled!');
       var connParams = {
    host: 'sdt16057.labs.teradata.com',
    log: '0',
    password: 'dbc',
    user: 'dbc'
   };
    var teradataConnection = new TeradataConnection();
         teradataConnection.connect(connParams);
         console.log("Connect Success");
         teradataConnection.close();
         console.log("Close Success");
  }

};
