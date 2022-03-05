import { Spacer, Text, useTheme } from '@nextui-org/react'
import Image from 'next/image'
import { CSSProperties } from 'react'

export const Navbar = () => {

	const { theme } = useTheme()

	const styles: CSSProperties = {
		display: 'flex',
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'start',
		padding: '20px 0',
		backgroundColor: theme?.colors.gray900.value,
	}

	return (		
		<div style={ styles }>
			<Image 
				src={ 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png' }
				alt="icono de la app"
				width={ 50 }
				height={ 50 }
			/>
			<Text color="white" h2>P</Text>      
			<Text color="white" h3>okémon</Text>      
			<Spacer css={{ 
				flex: 1,
			}}/>
			<Text color="white">Favoritos</Text>      
		</div>
	)
}
