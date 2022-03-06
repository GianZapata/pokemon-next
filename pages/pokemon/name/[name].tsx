import { useState } from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image';

import confetti from 'canvas-confetti';

import { getPokemonInfo, localFavorites } from '../../../utils';
import { pokeApi } from '../../../api'
import { Pokemon, PokemonListResponse, SmallPokemon } from '../../../interfaces'
import { MainLayout } from '../../../components/layouts';
import { Grid, Card, Text, Button, Container } from '@nextui-org/react';

interface Props { 
	pokemon: Pokemon;
}

const PokemonByNamePage : NextPage<Props> = ({ pokemon }) => {

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

export default PokemonByNamePage

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async () => {

	const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')	
	
	const paths = data.results.map( (pokemon: SmallPokemon) => ({
		params: {
			name: pokemon.name
		}
	}))

	return {
		paths,
		fallback: false
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
   
	const { name } = params as { name: string}
	
	const pokemon = await getPokemonInfo(name)

	return { 
		props: { pokemon  }
	}
}
