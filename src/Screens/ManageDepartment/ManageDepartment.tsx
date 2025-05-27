import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import axios from 'axios';
// import {IDepartmentsType} from '../../Types/Types';
import {useStore} from '../../Stores/StoreProvider';
import {observer} from 'mobx-react-lite';

const ManageDepartment = observer(() => {
  // const API_URL = process.env.API_URL;
  const {departmentStore} = useStore();
  const [modalVisible, setModalVisible] = useState(false);
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
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable onPress={() => setModalVisible(true)}>
          <Text>Create Department</Text>
        </Pressable>
      </View>
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
    padding: 10,
    justifyContent: 'space-between',
  },
  text: {fontSize: 20, fontWeight: 'bold'},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
