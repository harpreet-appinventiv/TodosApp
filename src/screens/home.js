import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { addTask, deleteTask, editTask, completeTask } from './homeAction';


class Home extends React.Component{
  constructor(props){
    super();
    this.state = {
      listData : [],
      task : ""
    }
  }

  onAddingTast = (task) => {
    this.props.addTask(task)
    this.setState({task:''})
  }

  render(){
    const {listData, completeTask, cancleTask, deleteTask} = this.props;
    return (
      <React.Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            keyboardShouldPersistTaps={"handled"}
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <Text style={styles.mainHeading} >Manage your Todos</Text>
              <View style={styles.taskContainer}>
                <TextInput 
                  multiline={true} 
                  placeholder={"Enter Task here..."} 
                  value={this.state.task}
                  onChangeText={(task) => this.setState({task})}
                  style={styles.taskInput} 
                />
                <TouchableOpacity
                  onPress={() => {this.state.task && this.onAddingTast(this.state.task)}}
                  style={styles.addButton}
                >
                  <Text style={styles.addText}>ADD</Text>
                </TouchableOpacity>
              </View>
              { listData && <TodoList state={this.state} listData={listData} completeTask={completeTask} cancleTask={cancleTask} deleteTask={deleteTask} />}
            </View>
          </ScrollView>
        </SafeAreaView>
      </React.Fragment>
    );
  }
};

const TodoList = ({state, listData, completeTask, cancleTask, deleteTask}) =>{
  return(
    <FlatList 
      data={listData}
      extraData={state}
      keyboardShouldPersistTaps={"always"}
      renderItem={({item})=>
        <RenderRodoList item={item} completeTask={completeTask} deleteTask={deleteTask} />
      }
      style={{marginTop:15}}
    />
  )
}

const RenderRodoList = ({item, completeTask, deleteTask}) =>{
  // alert(isCompleted)
  return(
    <View style={styles.rowView} >
      <View style={styles.todoTile}>
        <Text numberOfLines={2} style={{textDecorationLine: item.status ? "line-through" : "none"}} >{item.task}</Text>
      </View>
      <View style={styles.rowButtons} >
        <TouchableOpacity style={[styles.todoRowButton]} onPress={() => completeTask(item.id)} >
          <Image source={require("../../assets/tick.png")} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.todoRowButton,{backgroundColor:"blue"}]}>
           <Image source={require("../../assets/draw.png")} style={styles.icons} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.todoRowButton,{backgroundColor:"darkgrey"}]} onPress={() => deleteTask(item.id)}>
           <Image source={require("../../assets/close.png")} style={styles.icons} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#fff",
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: '#fff',
    padding:15
  },
  mainHeading:{
    fontWeight:"500",
    fontSize:20,
    alignSelf:"center"
  },
  taskContainer:{
    flexDirection:"row",
    flexWrap:"wrap",
    marginTop:20,
    justifyContent:"space-around"
  },
  taskInput:{
    borderWidth:1,
    borderColor:"#00000040",
    borderRadius:5,
    padding:5,
    width:"70%",
    paddingVertical:10,
    maxHeight:60,
  },
  addButton:{
    backgroundColor:"gray",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:4,
    padding:3,
    paddingHorizontal:8,
    height:35
  },
  rowView:{
    flexDirection:"row", 
    flexWrap:"wrap", 
    justifyContent:"space-around", 
    marginBottom:5
  },
  todoTile:{
    flex:0.7,
    justifyContent:"center"
  },
  rowButtons:{
    flex:0.3, 
    flexDirection:"row", 
    flexWrap:"wrap", 
    justifyContent:"space-around"
  },
  todoRowButton: {
    backgroundColor:"green",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:100,
    height:24,
    width:24
  },
  addText:{
    color:"#fff"
  },
  icons:{
    height:14, 
    width:14
  }
});

export default connect((props) => {
  return {
    listData: props.listData
  }
}, {addTask, completeTask, editTask, deleteTask })(Home)
