import { Text, View, TextInput, Button } from 'react-native'
import React, { Component } from 'react'
import { style } from './Style'

export class Depan extends Component {
  constructor(props){
      super(props);
      this.state={
        kd_barang:'',
        nm_barang:'',
        stok:'',
        harga:'',
        listData:[],
        idEdit:null
      };
      this.url ="http://192.168.1.3:5000/products";
  }
  componentDidMount(){
      this.ambilListData()
  }
  async ambilListData(){
    await fetch(this.url)
    .then((response)=>response.json())
    .then((json)=>{
        console.log('Hasil yang didapat:'+JSON.stringify(json));
        this.setState({listData:json});
    })
    .catch((error)=>{
        console.log(error);
    })
  }

  klikSimpan(){
    if(this.state.kd_barang == '' || this.state.nm_barang == ''){
      alert('Silahkan masukkan kode barang dan nama barang');
    }else{
      if(this.state.idEdit){
        var urlAksi = this.url+"/"+this.state.idEdit;
        var method = 'patch';
      }else{
        var urlAksi = this.url;
        var method = 'post'; 
      }
      
      fetch(urlAksi,{
        method: method,
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({ 
          kd_barang:this.state.kd_barang,
          nm_barang:this.state.nm_barang,
          stok:this.state.stok,
          harga:this.state.harga
        }) 
      })
      .then((response)=>response.json())
      .then((json)=>{
        this.setState({kd_barang:''});
        this.setState({nm_barang:''});
        this.setState({stok:''});
        this.setState({harga:''});
        this.ambilListData();
      })
    }
  }

  async klikEdit(id){
    await fetch(this.url+"/"+id)
    .then((response)=>response.json())
    .then((json) => {
      //console.log(this.url+"/"+id);
      console.log(json);
      this.setState({kd_barang:json.kd_barang});
      this.setState({nm_barang:json.nm_barang});
      this.setState({stok:json.stok});
      this.setState({harga:json.harga})
      this.setState({idEdit:id})
      })
  }

  async klikDelete(id){
    var urlDelete = this.url+"/"+id;
    await fetch(urlDelete,{
      method: 'delete',
      headers:{
        'Content-Type':'application/json'
      },
    })
    .then((response)=>response.json())
    .then((json)=>{
      alert('Data berhasil dihapus');
      this.ambilListData();
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    return (
      <View style={style.viewWrapper}>
        <View style={style.viewData}>
            {
                this.state.listData.map((val,index)=>(
                  <View style={style.viewList} key={index}>
                      <Text style={style.textListNama}>{val.kd_barang}</Text>
                      <Text style={style.textListNama}>{val.nm_barang}</Text>
                      <Text style={style.textListEdit} onPress={()=>this.klikEdit(val.id)}>View</Text>
                      {/*<Text style={style.textListDelete} onPress={()=>this.klikDelete(val.id)}>Delete</Text> */}
                  </View>  
                ))
            }
        </View>
        <View style={style.viewForm}>
            <TextInput 
                style={style.TextInput} 
                placeholder="Masukkan Kode Barang" 
                value={this.state.kd_barang} 
                onChangeText={(text)=>this.setState({kd_barang:text})}> 
            </TextInput>
            <TextInput 
                style={style.TextInput} 
                placeholder="Masukkan Nama Barang" 
                value={this.state.nm_barang} 
                onChangeText={(text)=>this.setState({nm_barang:text})}>
            </TextInput>
            <TextInput 
                style={style.TextInput} 
                placeholder="Masukkan Stok" 
                value={this.state.stok} 
                onChangeText={(text)=>this.setState({stok:text})}>
            </TextInput>
            <TextInput 
                style={style.TextInput} 
                placeholder="Masukkan Harga" 
                value={this.state.harga} 
                onChangeText={(text)=>this.setState({harga:text})}>
            </TextInput>
            {/*<Button 
                title="Masukkan Data"
                onPress={()=>this.klikSimpan()}>
          </Button> */}
        </View>
      </View>
    )
  }
}

export default Depan