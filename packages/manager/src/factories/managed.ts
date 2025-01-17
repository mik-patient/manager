import * as Factory from 'factory.ts';
import {
  DataSeries,
  ManagedCredential,
  ManagedIssue,
  ManagedServiceMonitor,
  ManagedStats,
} from '@linode/api-v4/lib/managed/types';

export const credentialFactory = Factory.Sync.makeFactory<ManagedCredential>({
  id: Factory.each((i) => i),
  last_decrypted: '2019-07-01',
  label: 'credential-1',
});

export const monitorFactory = Factory.Sync.makeFactory<ManagedServiceMonitor>({
  consultation_group: '',
  timeout: 10,
  label: 'Test service',
  created: '2019-08-01T20:29:14',
  status: 'pending',
  region: null,
  updated: '2019-08-01T20:31:19',
  service_type: 'url',
  notes: '',
  id: Factory.each((i) => i),
  credentials: credentialFactory.buildList(3),
  address: 'http://www.example.com',
  body: '',
});

export const generateManagedStats = (modifier = 1): DataSeries[] => {
  const stat: DataSeries[] = [];
  let i = 0;
  for (i; i < 200; i++) {
    stat.push({ x: Date.now() - i * 300000, y: Math.random() * modifier });
  }
  return stat;
};

export const managedStatsFactory = Factory.Sync.makeFactory<ManagedStats>({
  data: {
    cpu: generateManagedStats(4),
    disk: generateManagedStats(),
    net_in: generateManagedStats(3),
    net_out: generateManagedStats(2),
    swap: generateManagedStats(),
  },
});

export const managedIssueFactory = Factory.Sync.makeFactory<ManagedIssue>({
  created: '2018-01-01T00:01:01',
  entity: {
    id: 98765,
    label: 'Managed Issue opened!',
    type: 'ticket',
    url: '/support/tickets/98765',
  },
  id: 823,
  services: [],
});
