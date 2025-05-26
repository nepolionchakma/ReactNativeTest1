import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
// import axios from 'axios';
// import {IDepartmentsType} from '../../Types/Types';
import {useStore} from '../../Stores/StoreProvider';
import {observer} from 'mobx-react-lite';

const ManageDepartment = observer(() => {
  // const API_URL = process.env.API_URL;
  const {departmentStore} = useStore();
  // const [isLoading, setIsLoading] = useState(false);
  // const [departments, setDepartments] = useState<IDepartmentsType[]>([]);
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       setIsLoading(true);
  //       const res = await axios.get(`${API_URL}/test/departments`);
  //       console.log(res.data, 'res');
  //       departmentStore.addDepartment(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   })();
  // }, [API_URL, departmentStore]);
  // console.log(departments, 'departments');
  useEffect(() => {
    departmentStore.fetchDepartments();
  }, [departmentStore]);
  console.log(departmentStore.isLoading, 'isLoading');
  return (
    <View style={styles.container}>
      {/* <Text>ManageDepartment</Text> */}
      {departmentStore.isLoading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <View>
          <FlatList
            data={departmentStore.departments}
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
});
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
