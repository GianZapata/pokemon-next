import { Spacer, Text, useTheme, Link, Input, FormElement } from '@nextui-org/react'
import Image from 'next/image'
import NextLink from 'next/link'
import { CSSProperties, Dispatch, FC, SetStateAction } from 'react'
import { SmallPokemon } from '../../interfaces'
import { useRouter } from 'next/router';
// interface Props { 
// 	// setSearchPokemons: Dispatch<SetStateAction<SmallPokemon[]>>
// 	// pokemons: SmallPokemon[]
// }

export const Navbar: FC = () => {

	const router = useRouter()

	const { theme } = useTheme()
	
	const styles: CSSProperties = {
		display: 'flex',
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'start',
		padding: '20px 15px',
		backgroundColor: theme?.colors.gray900.value,
	}

	const searchPokemons = (e: React.ChangeEvent<FormElement>) => {
		// const pokemonName = e.target.value.toLowerCase()		
		// const filteredData = pokemons.filter( pokemon => pokemon.name.toLowerCase().includes(pokemonName) )
		// setSearchPokemons(filteredData)		
	}

	return (		
		<div style={ styles }>
			<Image 
				src={ 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png' }
				alt='icono de la app'
				width={ 50 }
				height={ 50 }
			/>
			<NextLink href='/' passHref>
				<Link>
					<Text color={'white'} h2>P</Text>      
					<Text color={'white'} h3>okémon</Text> 
				</Link>
			</NextLink>
			
			<Spacer css={{ 
				flex: 1,
			}}/>
			{ 
				router.asPath === '/' && (					
					<Input 	
						onChange={ searchPokemons }
						aria-label='Buscar pokemón'	
						placeholder='Buscar pokémon...' 
						size={ 'md' }
						clearable
						type="search"
						bordered
						css={{ 
							marginRight: '20px',
						}}				
					/>
				)
			}
			<NextLink href={'/favorites'} passHref>
				<Link>
					<Text color='white'>Favoritos</Text>    			
				</Link>
			</NextLink>
		</div>
	)
}
