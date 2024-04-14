interface TypeColors {
    [key: string]: string;
}

export const getTypeColor = (type: string): string => {
    const typeColors: TypeColors = {
        grass: '#08FEC3',
        poison: '#AF08FE',
        water: '#00A3FF',
        fire: '#FE0808',
        electric: '#FFB800',
        ground: '#85826E',
        fairy: '#FBA1EC',
        normal: '#C4C4C4',
        flying: '#5317FC',
        default: '#0E0E0E'
    };
    return typeColors[type.toLowerCase()] || typeColors.default;
};