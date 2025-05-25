import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {IDepartmentsType} from '../../Types/Types';

const ManageDepartment = () => {
  const API_URL = process.env.API_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState<IDepartmentsType[]>([]);
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${API_URL}/test/departments`);
        setDepartments(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [API_URL]);
  console.log(departments, 'departments');

  return (
    <View style={styles.container}>
      {/* <Text>ManageDepartment</Text> */}
      {isLoading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <View>
          <FlatList
            data={departments}
            renderItem={({item, index}) => (
              <View>
                <Text>
                  <>{index + 1}</>
                  <> </>
                  <>{item.department_name}</>
                </Text>
              </View>
            )}
            ListHeaderComponent={ListHeaderComponent}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
};
const ListHeaderComponent = () => {
  return <Text style={styles.text}>Departments</Text>;
};
export default ManageDepartment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  text: {fontSize: 20, fontWeight: 'bold'},
});
