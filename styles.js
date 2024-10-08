import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  filterButton: {
    flex: 1,
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
});

export default styles;