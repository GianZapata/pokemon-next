import { useState } from 'react'

import { GetStaticProps, NextPage, GetStaticPaths } from 'next'
import { Grid, Card, Text, Button, Container, Image } from '@nextui-org/react'

import confetti from 'canvas-confetti'

import { localFavorites } from '../../utils'
import { MainLayout } from '../../components/layouts'
import { Pokemon } from '../../interfaces'
import { getPokemonInfo } from '../../utils';
interface Props { 
	pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
	const [isInFavorites, setIsInFavorites] = useState( localFavorites.existInFavorites(pokemon.id) )

	const onToggleFavorite = () => { 
		localFavorites.toggleFavorite(pokemon.id)
		setIsInFavorites(!isInFavorites)

		if( isInFavorites ) return

		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 }
		})
	}

	return (
		<MainLayout title={`Pokémon ${pokemon.name}`}>
			<Grid.Container css={{  marginTop: '5px' }} gap={ 2 }>
				<Grid xs={ 12 } sm={ 4 }>
					<Card hoverable css={{ padding: ' 30px' }}>
						<Card.Image
							src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png' }
							alt={ pokemon.name }
							width={ '100%' }
							height={ 200 }
						/>
					</Card>
				</Grid>
				<Grid xs={ 12 } sm={ 8 }>
					<Card>
						<Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
							<Text h1 transform='capitalize'>{ pokemon.name }</Text>
							<Button 
								color="gradient" 
								ghost={ !isInFavorites }
								onClick={ onToggleFavorite }
							>
								{ isInFavorites ? 'En favoritos' : 'Agregar a favoritos' }	
							</Button>
						</Card.Header>
						<Card.Body>
							<Text size={ 30 }>Sprites:</Text>
							<Container direction='row' display='flex' gap={ 0 }>
								<Image
									src={ pokemon.sprites.front_default || '/no-image.png' }
									alt={ pokemon.name }
									width={ 100 }
									height={ 100 }									
								/>
								<Image
									src={ pokemon.sprites.back_default || '/no-image.png' }
									alt={ pokemon.name }
									width={ 100 }
									height={ 100 }									
								/>
								<Image
									src={ pokemon.sprites.front_shiny || '/no-image.png' }
									alt={ pokemon.name }
									width={ 100 }
									height={ 100 }									
								/>
								<Image
									src={ pokemon.sprites.back_shiny || '/no-image.png' }
									alt={ pokemon.name }
									width={ 100 }
									height={ 100 }									
								/>
							</Container>
							<Text h2>  
								<Text size={ 30 }>Tipo:</Text>
								{ pokemon.types.map(type => (
									<Text key={ type.type.name } transform="capitalize">{ type.type.name }</Text>
								))}</Text>
						</Card.Body>
					</Card>
				</Grid>
			</Grid.Container>
		</MainLayout>
	)
}

export default PokemonPage

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async () => {
	// const { data } = await  // your fetch function here 
	const pokemons151 = [...Array(151)].map( (value, index) => `${index + 1}`)
	
	const paths = pokemons151.map( id => ({ 
		params: { id } 
	}))

	return {
		paths,
		// paths: [
		// 	{ params: { id: '1'} },
		// 	{ params: { id: '2'} }
		// ],
		// fallback: false // Fallback sirve para que el navegador no tenga que descargar todas las páginas	
		fallback: 'blocking'
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { id } = params as { id: string}
	
	const pokemon = await getPokemonInfo(id)

	// Si el data es nul no existe el pokemon y se redirige a la pagina de inicio
	if(!pokemon) { 
		return { 
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	return { 
		props: { pokemon  },
		revalidate: 86400 // Revalidation: Sirve para que el navegador no vuelva a pedir la info de la pagina
	}
}

