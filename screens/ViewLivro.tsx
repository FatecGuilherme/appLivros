import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';

export default function ViewLivro({ route }: { route: any }) {
  const { id } = route.params;
  const [livro, setLivro] = useState<any>(null);

  useEffect(() => {
    fetchLivro();
  }, []);

  const fetchLivro = async () => {
    try {
      const response = await axios.get(`https://bibliotecaetecmaua.azurewebsites.net/api/LivrosSedeApi/${id}`);
      setLivro(response.data);
    } catch (error) {
      console.error("Erro ao buscar livro:", error);
    }
  };

  return (
    <View style={[styles.container, {width: "auto"}]}>
      {livro && (
        <View style={styles.card}>

          <View style={styles.descricao}>
            <Text style={styles.titulo}>{livro.titulo}</Text>
            <Text style={styles.ano}>Lançamento: {livro.ano}</Text>
          </View>
            
          <View style={styles.content}>
            <View style={styles.texto}>
           
              <View style={styles.informacoes}>
                <Text style={styles.label}>
                  <Text style={styles.label}>ISBN/ISSN:<Text style={styles.textLabel}> {livro.isbnIssn}</Text></Text>     
                  <Text style={styles.label}> | Editora: <Text style={styles.textLabel}> {livro.editora}</Text></Text>  
                </Text> 

                <Text style={styles.label}>Autor Principal: <Text style={styles.textLabel}> {livro.autorPrincipal}</Text></Text>
                <Text style={styles.label}>Assuntos: <Text style={styles.textLabel}>{livro.assuntos}</Text> </Text>
                <Text style={styles.label}>Autores: <Text style={styles.textLabel}> {livro.autores}</Text></Text>
                
                <Text style={styles.label}>
                  <Text style={styles.label}>Edição: <Text style={styles.textLabel}> {livro.edicao}</Text></Text>
                  <Text style={styles.label}> | Idioma: <Text style={styles.textLabel}> {livro.idioma}</Text></Text>
                  <Text style={styles.label}> | Material: <Text style={styles.textLabel}> {livro.material}</Text></Text>
                </Text>
              
                <Text style={[styles.label, { marginBottom: 15 }]}>Obra: <Text style={styles.textLabel}> {livro.obra}</Text></Text>
              </View>
            </View>

            <Image
              resizeMode="contain"
              source={{ uri: `https://bibliotecaetecmaua.azurewebsites.net/Content/Images/${livro.imagem}` }}
              style={[styles.img, {width: 200, aspectRatio: 1}]}
            />

          </View>
        </View>
      )}
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    ...((Dimensions.get('window').width < 600) ? {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#673365',
      display: 'flex',
    } : {}),
  },
  content: {
    flexDirection: 'row',
  },
  
  img: {
    // marginLeft:-50,
    marginBottom: 20,
    marginRight: 30,
    marginLeft: 30,
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    backgroundColor: '#9a6296',
    borderRadius: 20,
    padding: 20,
    //height:"80%",
    margin: "auto",
    alignItems: 'center',
    justifyContent: 'center'
  },

  texto: {
    // alignItems: 'center',
  },

  descricao: {
    marginBottom: 30,
    marginTop: 10,
  },
  
  titulo: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 5,
    textAlign: 'left',
  },

  ano: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },

  informacoes: {
    width: '100%',
    display: 'flex',
    flex: 1,
    justifyContent: 'center'
  },

  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },

  textLabel : {
    fontWeight:"normal"
  },
});
