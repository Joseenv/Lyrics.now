
const App = {
    data() {
        return {
            API: "https://api.lyrics.ovh",
            busqueda: '',
            canciones: [],
            cancion: {

            },
            buscando: true
        }
    },
    methods: {
        async buscarCancion () {
            try {
                this.buscando = true;
                const request = await fetch(`${this.API}/suggest/${this.busqueda}`);
                const canciones = await request.json();
                this.canciones = canciones.data;

            } catch (error) {

                console.error( error.message);
                
            }
        },
        async obtenerCancion( artista, titulo ) {
            try {

                const request = await fetch(`${ this.API }/v1/${artista}/${titulo}`);
                const response = await request.json();
                const letra = response.lyrics;
                this.mostrarCancion( artista, titulo, letra );
                
            } catch (error) {
                this.cancion.letra = 'No hay letra disponible para está canción 🙁'
                console.error( error.message );
            }
        },

        mostrarCancion( artista, titulo, letra) {
            this.buscando = false;
            this.cancion.artista = artista;
            this.cancion.titulo = titulo;
            this.cancion.letra = letra.replace(/\r\n|\n|\r/g, "<br>");
        }
    }
}

Vue.createApp(App).mount('#aplicacion');