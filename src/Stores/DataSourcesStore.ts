import axios from 'axios';
import {types, flow, Instance} from 'mobx-state-tree';

// Define the DataSource model
const IDataSource = types.model('IDataSource', {
  datasource_name: types.string,
  description: types.string,
  application_type: types.string,
  application_type_version: types.string,
  last_access_synchronization_status: types.string,
  last_transaction_synchronization_status: types.string,
  default_datasource: types.boolean,
  created_by: types.string,
  last_updated_by: types.string,
});
// const axios = process.env.axios_URL;

// Define the DataStore
export const DataSourceStore = types
  .model('DataSourceStore', {
    dataSources: types.array(IDataSource), // List of data sources
  })
  .actions(self => ({
    // Fetch Data Sources (with pagination)
    fetchDataSources: flow(function* (page: number, limit: number) {
      try {
        const response = yield axios.get(`/data-sources/${page}/${limit}`);
        self.dataSources = response.data ?? []; // Update dataSources state
      } catch (error) {
        console.error(error);
      }
    }),

    // Fetch a single data source by ID
    fetchDataSource: flow(function* (id: number) {
      try {
        const response = yield axios.get(`/data-sources/${id}`);
        return response.data; // Returning the fetched data
      } catch (error) {
        console.error(error);
      }
    }),

    // Create a new data source
    createDataSource: flow(function* (postData: Instance<typeof IDataSource>) {
      try {
        const response = yield axios.post('/data-sources', postData);
        if (response.status === 201) {
          return response.data;
        }
      } catch (error) {
        console.error(error);
      }
    }),

    // Update an existing data source
    updateDataSource: flow(function* (
      id: number,
      postData: Instance<typeof IDataSource>,
    ) {
      try {
        const response = yield axios.put(`/data-sources/${id}`, postData);
        if (response.status === 200) {
          return response.data;
        }
      } catch (error) {
        console.error(error);
      }
    }),

    // Delete a data source by ID
    deleteDataSource: flow(function* (id: number) {
      try {
        const response = yield axios.delete(`/data-sources/${id}`);
        if (response.status === 200) {
          return response.data;
        }
      } catch (error) {
        console.error(error);
      }
    }),
  }));

// Define Type for TypeScript type checking
export type IDataSourceStore = Instance<typeof DataSourceStore>;
