// Test runner using built CommonJS bundle
const lib = require('./dist/index.cjs');

const ApplicationCreator = lib.ApplicationCreator;

// Rich example project with two modules and multiple entities/relations
const project = {
  overview: { identifier: 'proj', name: 'MeuProjeto', purpose: 'demo', miniwolrd: '', architecture: '' },
  modules: [
    {
      identifier: 'mod1',
      name: 'Conta',
      miniwolrd: '',
      purpose: '',
      requisites: { identifier: 'r1', name: 'reqs', fr: [], nfr: [], br: [] },
      actors: [],
      uc: [],
      packages: [
        {
          identifier: 'pkg_conta',
          name: 'domain',
          entities: [
            {
              identifier: 'Cliente',
              description: 'Cliente do sistema',
              attributes: [
                { identifier: 'id', type: 'string', blank: false, unique: true },
                { identifier: 'nome', type: 'string', blank: false, unique: false }
              ],
              relationsAttr: []
            },
            {
              identifier: 'Conta',
              description: 'Conta bancária',
              attributes: [
                { identifier: 'numero', type: 'string', blank: false, unique: true },
                { identifier: 'saldo', type: 'number', blank: false, unique: false }
              ],
              relationsAttr: [
                { identifier: 'cliente_ref', relationType: 'ManyToOne', targetObject: { identifier: 'Cliente', attributes: [], relationsAttr: [] } }
              ]
            }
          ]
        }
      ]
    },
    {
      identifier: 'mod2',
      name: 'Pagamento',
      miniwolrd: '',
      purpose: '',
      requisites: { identifier: 'r2', name: 'reqs', fr: [], nfr: [], br: [] },
      actors: [],
      uc: [],
      packages: [
        {
          identifier: 'pkg_pagamento',
          name: 'domain',
          entities: [
            {
              identifier: 'Transacao',
              description: 'Transação financeira',
              attributes: [
                { identifier: 'id', type: 'string', blank: false, unique: true },
                { identifier: 'valor', type: 'number', blank: false, unique: false }
              ],
              relationsAttr: [
                { identifier: 'conta_origem', relationType: 'ManyToOne', targetObject: { identifier: 'Conta', attributes: [], relationsAttr: [] } },
                { identifier: 'conta_destino', relationType: 'ManyToOne', targetObject: { identifier: 'Conta', attributes: [], relationsAttr: [] } }
              ]
            },
            {
              identifier: 'Pagamento',
              description: 'Registro de pagamento',
              attributes: [
                { identifier: 'id', type: 'string', blank: false, unique: true },
                { identifier: 'data', type: 'date', blank: false, unique: false }
              ],
              relationsAttr: [
                { identifier: 'transacao', relationType: 'OneToOne', targetObject: { identifier: 'Transacao', attributes: [], relationsAttr: [] } }
              ]
            }
          ]
        }
      ]
    }
  ]
};

const out = './tmp_out_app';

// Use ApplicationCreator so we exercise the full flow (spark, docs, made, diagrams)
const app = new ApplicationCreator(project, out);
app.create();

console.log('Geração completa. Verifique a pasta', out + '/artifacts');