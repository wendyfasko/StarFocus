export interface GameWord {
  word: string;
  image: string;
  letters: string[];
  hint: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export interface LanguageWordSet {
  language: string;
  code: string;
  words: GameWord[];
}

// English Words
const englishWords: GameWord[] = [
  // Easy - 3 letter words
  { word: "CAT", image: "🐱", letters: ["C", "A", "T"], hint: "A furry pet that says meow", difficulty: "easy", category: "animals" },
  { word: "DOG", image: "🐶", letters: ["D", "O", "G"], hint: "Man's best friend", difficulty: "easy", category: "animals" },
  { word: "SUN", image: "☀️", letters: ["S", "U", "N"], hint: "Bright star in our sky", difficulty: "easy", category: "nature" },
  { word: "CAR", image: "🚗", letters: ["C", "A", "R"], hint: "Vehicle with four wheels", difficulty: "easy", category: "transport" },
  { word: "BAT", image: "🦇", letters: ["B", "A", "T"], hint: "Flying mammal", difficulty: "easy", category: "animals" },
  { word: "HAT", image: "👒", letters: ["H", "A", "T"], hint: "You wear it on your head", difficulty: "easy", category: "clothing" },
  { word: "BOX", image: "📦", letters: ["B", "O", "X"], hint: "Container for storing things", difficulty: "easy", category: "objects" },
  { word: "EGG", image: "🥚", letters: ["E", "G", "G"], hint: "Chickens lay these", difficulty: "easy", category: "food" },
  { word: "BEE", image: "🐝", letters: ["B", "E", "E"], hint: "Insect that makes honey", difficulty: "easy", category: "animals" },
  { word: "PEN", image: "🖊️", letters: ["P", "E", "N"], hint: "You write with this", difficulty: "easy", category: "objects" },

  // Medium - 4 letter words
  { word: "STAR", image: "⭐", letters: ["S", "T", "A", "R"], hint: "Twinkles in the night sky", difficulty: "medium", category: "space" },
  { word: "MOON", image: "🌙", letters: ["M", "O", "O", "N"], hint: "Earth's satellite", difficulty: "medium", category: "space" },
  { word: "FISH", image: "🐟", letters: ["F", "I", "S", "H"], hint: "Swims in water", difficulty: "medium", category: "animals" },
  { word: "BIRD", image: "🐦", letters: ["B", "I", "R", "D"], hint: "Has wings and can fly", difficulty: "medium", category: "animals" },
  { word: "BOOK", image: "📚", letters: ["B", "O", "O", "K"], hint: "You read this", difficulty: "medium", category: "objects" },
  { word: "TREE", image: "🌳", letters: ["T", "R", "E", "E"], hint: "Tall plant with leaves", difficulty: "medium", category: "nature" },
  { word: "CAKE", image: "🎂", letters: ["C", "A", "K", "E"], hint: "Sweet dessert for birthdays", difficulty: "medium", category: "food" },
  { word: "BALL", image: "⚽", letters: ["B", "A", "L", "L"], hint: "Round object used in games", difficulty: "medium", category: "sports" },
  { word: "SHIP", image: "🚢", letters: ["S", "H", "I", "P"], hint: "Large boat that sails on water", difficulty: "medium", category: "transport" },
  { word: "HOME", image: "🏠", letters: ["H", "O", "M", "E"], hint: "Place where you live", difficulty: "medium", category: "places" },

  // Hard - 5+ letter words
  { word: "PLANET", image: "🪐", letters: ["P", "L", "A", "N", "E", "T"], hint: "Large celestial body orbiting a star", difficulty: "hard", category: "space" },
  { word: "ROCKET", image: "🚀", letters: ["R", "O", "C", "K", "E", "T"], hint: "Spacecraft that travels to space", difficulty: "hard", category: "space" },
  { word: "FLOWER", image: "🌸", letters: ["F", "L", "O", "W", "E", "R"], hint: "Colorful part of a plant", difficulty: "hard", category: "nature" },
  { word: "CASTLE", image: "🏰", letters: ["C", "A", "S", "T", "L", "E"], hint: "Large fortified building", difficulty: "hard", category: "places" },
  { word: "DRAGON", image: "🐉", letters: ["D", "R", "A", "G", "O", "N"], hint: "Mythical fire-breathing creature", difficulty: "hard", category: "fantasy" },
  { word: "SCHOOL", image: "🏫", letters: ["S", "C", "H", "O", "O", "L"], hint: "Place where children learn", difficulty: "hard", category: "places" },
  { word: "FAMILY", image: "👨‍👩‍👧‍👦", letters: ["F", "A", "M", "I", "L", "Y"], hint: "Parents and children together", difficulty: "hard", category: "people" },
  { word: "FRIEND", image: "👫", letters: ["F", "R", "I", "E", "N", "D"], hint: "Someone you like to play with", difficulty: "hard", category: "people" },
  { word: "HAPPY", image: "😊", letters: ["H", "A", "P", "P", "Y"], hint: "Feeling of joy", difficulty: "hard", category: "emotions" },
  { word: "MAGIC", image: "✨", letters: ["M", "A", "G", "I", "C"], hint: "Supernatural powers", difficulty: "hard", category: "fantasy" }
];

// Spanish Words
const spanishWords: GameWord[] = [
  // Easy
  { word: "GATO", image: "🐱", letters: ["G", "A", "T", "O"], hint: "Un animal que dice miau", difficulty: "easy", category: "animals" },
  { word: "PERRO", image: "🐶", letters: ["P", "E", "R", "R", "O"], hint: "El mejor amigo del hombre", difficulty: "easy", category: "animals" },
  { word: "SOL", image: "☀️", letters: ["S", "O", "L"], hint: "Estrella brillante en nuestro cielo", difficulty: "easy", category: "nature" },
  { word: "CASA", image: "🏠", letters: ["C", "A", "S", "A"], hint: "Lugar donde vives", difficulty: "easy", category: "places" },
  { word: "AGUA", image: "💧", letters: ["A", "G", "U", "A"], hint: "Líquido transparente que bebes", difficulty: "easy", category: "nature" },
  { word: "PAN", image: "🍞", letters: ["P", "A", "N"], hint: "Alimento básico hecho de harina", difficulty: "easy", category: "food" },
  { word: "FLOR", image: "🌸", letters: ["F", "L", "O", "R"], hint: "Parte colorida de una planta", difficulty: "easy", category: "nature" },
  { word: "LUNA", image: "🌙", letters: ["L", "U", "N", "A"], hint: "Satélite de la Tierra", difficulty: "easy", category: "space" },
  { word: "AMOR", image: "❤️", letters: ["A", "M", "O", "R"], hint: "Sentimiento profundo de cariño", difficulty: "easy", category: "emotions" },
  { word: "NIÑO", image: "👶", letters: ["N", "I", "Ñ", "O"], hint: "Persona muy joven", difficulty: "easy", category: "people" },

  // Medium
  { word: "ESTRELLA", image: "⭐", letters: ["E", "S", "T", "R", "E", "L", "L", "A"], hint: "Brilla en el cielo nocturno", difficulty: "medium", category: "space" },
  { word: "CABALLO", image: "🐴", letters: ["C", "A", "B", "A", "L", "L", "O"], hint: "Animal que galopa", difficulty: "medium", category: "animals" },
  { word: "ESCUELA", image: "🏫", letters: ["E", "S", "C", "U", "E", "L", "A"], hint: "Lugar donde aprenden los niños", difficulty: "medium", category: "places" },
  { word: "FAMILIA", image: "👨‍👩‍👧‍👦", letters: ["F", "A", "M", "I", "L", "I", "A"], hint: "Padres e hijos juntos", difficulty: "medium", category: "people" },
  { word: "PLANETA", image: "🪐", letters: ["P", "L", "A", "N", "E", "T", "A"], hint: "Cuerpo celeste grande", difficulty: "medium", category: "space" },

  // Hard
  { word: "ASTRONAUTA", image: "👨‍🚀", letters: ["A", "S", "T", "R", "O", "N", "A", "U", "T", "A"], hint: "Persona que viaja al espacio", difficulty: "hard", category: "space" },
  { word: "MARIPOSA", image: "🦋", letters: ["M", "A", "R", "I", "P", "O", "S", "A"], hint: "Insecto con alas coloridas", difficulty: "hard", category: "animals" },
  { word: "COHETE", image: "🚀", letters: ["C", "O", "H", "E", "T", "E"], hint: "Nave espacial", difficulty: "hard", category: "space" },
  { word: "BIBLIOTECA", image: "📚", letters: ["B", "I", "B", "L", "I", "O", "T", "E", "C", "A"], hint: "Lugar lleno de libros", difficulty: "hard", category: "places" },
  { word: "UNIVERSIDAD", image: "🎓", letters: ["U", "N", "I", "V", "E", "R", "S", "I", "D", "A", "D"], hint: "Institución de educación superior", difficulty: "hard", category: "places" }
];

// French Words
const frenchWords: GameWord[] = [
  // Easy
  { word: "CHAT", image: "🐱", letters: ["C", "H", "A", "T"], hint: "Animal qui dit miaou", difficulty: "easy", category: "animals" },
  { word: "CHIEN", image: "🐶", letters: ["C", "H", "I", "E", "N"], hint: "Meilleur ami de l'homme", difficulty: "easy", category: "animals" },
  { word: "SOLEIL", image: "☀️", letters: ["S", "O", "L", "E", "I", "L"], hint: "Étoile brillante dans notre ciel", difficulty: "easy", category: "nature" },
  { word: "MAISON", image: "🏠", letters: ["M", "A", "I", "S", "O", "N"], hint: "Endroit où tu vis", difficulty: "easy", category: "places" },
  { word: "EAU", image: "💧", letters: ["E", "A", "U"], hint: "Liquide transparent que tu bois", difficulty: "easy", category: "nature" },
  { word: "PAIN", image: "🍞", letters: ["P", "A", "I", "N"], hint: "Aliment de base fait de farine", difficulty: "easy", category: "food" },
  { word: "FLEUR", image: "🌸", letters: ["F", "L", "E", "U", "R"], hint: "Partie colorée d'une plante", difficulty: "easy", category: "nature" },
  { word: "LUNE", image: "🌙", letters: ["L", "U", "N", "E"], hint: "Satellite de la Terre", difficulty: "easy", category: "space" },
  { word: "AMOUR", image: "❤️", letters: ["A", "M", "O", "U", "R"], hint: "Sentiment profond d'affection", difficulty: "easy", category: "emotions" },
  { word: "ENFANT", image: "👶", letters: ["E", "N", "F", "A", "N", "T"], hint: "Très jeune personne", difficulty: "easy", category: "people" },

  // Medium
  { word: "ÉTOILE", image: "⭐", letters: ["É", "T", "O", "I", "L", "E"], hint: "Brille dans le ciel nocturne", difficulty: "medium", category: "space" },
  { word: "CHEVAL", image: "🐴", letters: ["C", "H", "E", "V", "A", "L"], hint: "Animal qui galope", difficulty: "medium", category: "animals" },
  { word: "ÉCOLE", image: "🏫", letters: ["É", "C", "O", "L", "E"], hint: "Endroit où les enfants apprennent", difficulty: "medium", category: "places" },
  { word: "FAMILLE", image: "👨‍👩‍👧‍👦", letters: ["F", "A", "M", "I", "L", "L", "E"], hint: "Parents et enfants ensemble", difficulty: "medium", category: "people" },
  { word: "PLANÈTE", image: "🪐", letters: ["P", "L", "A", "N", "È", "T", "E"], hint: "Grand corps céleste", difficulty: "medium", category: "space" },

  // Hard
  { word: "ASTRONAUTE", image: "👨‍🚀", letters: ["A", "S", "T", "R", "O", "N", "A", "U", "T", "E"], hint: "Personne qui voyage dans l'espace", difficulty: "hard", category: "space" },
  { word: "PAPILLON", image: "🦋", letters: ["P", "A", "P", "I", "L", "L", "O", "N"], hint: "Insecte aux ailes colorées", difficulty: "hard", category: "animals" },
  { word: "FUSÉE", image: "🚀", letters: ["F", "U", "S", "É", "E"], hint: "Vaisseau spatial", difficulty: "hard", category: "space" },
  { word: "BIBLIOTHÈQUE", image: "📚", letters: ["B", "I", "B", "L", "I", "O", "T", "H", "È", "Q", "U", "E"], hint: "Endroit plein de livres", difficulty: "hard", category: "places" },
  { word: "UNIVERSITÉ", image: "🎓", letters: ["U", "N", "I", "V", "E", "R", "S", "I", "T", "É"], hint: "Institution d'enseignement supérieur", difficulty: "hard", category: "places" }
];

// German Words
const germanWords: GameWord[] = [
  // Easy
  { word: "KATZE", image: "🐱", letters: ["K", "A", "T", "Z", "E"], hint: "Tier das miau sagt", difficulty: "easy", category: "animals" },
  { word: "HUND", image: "🐶", letters: ["H", "U", "N", "D"], hint: "Bester Freund des Menschen", difficulty: "easy", category: "animals" },
  { word: "SONNE", image: "☀️", letters: ["S", "O", "N", "N", "E"], hint: "Heller Stern an unserem Himmel", difficulty: "easy", category: "nature" },
  { word: "HAUS", image: "🏠", letters: ["H", "A", "U", "S"], hint: "Ort wo du lebst", difficulty: "easy", category: "places" },
  { word: "WASSER", image: "💧", letters: ["W", "A", "S", "S", "E", "R"], hint: "Klare Flüssigkeit die du trinkst", difficulty: "easy", category: "nature" },
  { word: "BROT", image: "🍞", letters: ["B", "R", "O", "T"], hint: "Grundnahrungsmittel aus Mehl", difficulty: "easy", category: "food" },
  { word: "BLUME", image: "🌸", letters: ["B", "L", "U", "M", "E"], hint: "Bunter Teil einer Pflanze", difficulty: "easy", category: "nature" },
  { word: "MOND", image: "🌙", letters: ["M", "O", "N", "D"], hint: "Satellit der Erde", difficulty: "easy", category: "space" },
  { word: "LIEBE", image: "❤️", letters: ["L", "I", "E", "B", "E"], hint: "Tiefes Gefühl der Zuneigung", difficulty: "easy", category: "emotions" },
  { word: "KIND", image: "👶", letters: ["K", "I", "N", "D"], hint: "Sehr junge Person", difficulty: "easy", category: "people" },

  // Medium
  { word: "STERN", image: "⭐", letters: ["S", "T", "E", "R", "N"], hint: "Leuchtet am Nachthimmel", difficulty: "medium", category: "space" },
  { word: "PFERD", image: "🐴", letters: ["P", "F", "E", "R", "D"], hint: "Tier das galoppiert", difficulty: "medium", category: "animals" },
  { word: "SCHULE", image: "🏫", letters: ["S", "C", "H", "U", "L", "E"], hint: "Ort wo Kinder lernen", difficulty: "medium", category: "places" },
  { word: "FAMILIE", image: "👨‍👩‍👧‍👦", letters: ["F", "A", "M", "I", "L", "I", "E"], hint: "Eltern und Kinder zusammen", difficulty: "medium", category: "people" },
  { word: "PLANET", image: "🪐", letters: ["P", "L", "A", "N", "E", "T"], hint: "Großer Himmelskörper", difficulty: "medium", category: "space" },

  // Hard
  { word: "ASTRONAUT", image: "👨‍🚀", letters: ["A", "S", "T", "R", "O", "N", "A", "U", "T"], hint: "Person die ins All reist", difficulty: "hard", category: "space" },
  { word: "SCHMETTERLING", image: "🦋", letters: ["S", "C", "H", "M", "E", "T", "T", "E", "R", "L", "I", "N", "G"], hint: "Insekt mit bunten Flügeln", difficulty: "hard", category: "animals" },
  { word: "RAKETE", image: "🚀", letters: ["R", "A", "K", "E", "T", "E"], hint: "Raumfahrzeug", difficulty: "hard", category: "space" },
  { word: "BIBLIOTHEK", image: "📚", letters: ["B", "I", "B", "L", "I", "O", "T", "H", "E", "K"], hint: "Ort voller Bücher", difficulty: "hard", category: "places" },
  { word: "UNIVERSITÄT", image: "🎓", letters: ["U", "N", "I", "V", "E", "R", "S", "I", "T", "Ä", "T"], hint: "Hochschuleinrichtung", difficulty: "hard", category: "places" }
];

// Italian Words
const italianWords: GameWord[] = [
  // Easy
  { word: "GATTO", image: "🐱", letters: ["G", "A", "T", "T", "O"], hint: "Animale che fa miao", difficulty: "easy", category: "animals" },
  { word: "CANE", image: "🐶", letters: ["C", "A", "N", "E"], hint: "Migliore amico dell'uomo", difficulty: "easy", category: "animals" },
  { word: "SOLE", image: "☀️", letters: ["S", "O", "L", "E"], hint: "Stella brillante nel nostro cielo", difficulty: "easy", category: "nature" },
  { word: "CASA", image: "🏠", letters: ["C", "A", "S", "A"], hint: "Posto dove vivi", difficulty: "easy", category: "places" },
  { word: "ACQUA", image: "💧", letters: ["A", "C", "Q", "U", "A"], hint: "Liquido trasparente che bevi", difficulty: "easy", category: "nature" },
  { word: "PANE", image: "🍞", letters: ["P", "A", "N", "E"], hint: "Alimento base fatto di farina", difficulty: "easy", category: "food" },
  { word: "FIORE", image: "🌸", letters: ["F", "I", "O", "R", "E"], hint: "Parte colorata di una pianta", difficulty: "easy", category: "nature" },
  { word: "LUNA", image: "🌙", letters: ["L", "U", "N", "A"], hint: "Satellite della Terra", difficulty: "easy", category: "space" },
  { word: "AMORE", image: "❤️", letters: ["A", "M", "O", "R", "E"], hint: "Sentimento profondo di affetto", difficulty: "easy", category: "emotions" },
  { word: "BAMBINO", image: "👶", letters: ["B", "A", "M", "B", "I", "N", "O"], hint: "Persona molto giovane", difficulty: "easy", category: "people" },

  // Medium
  { word: "STELLA", image: "⭐", letters: ["S", "T", "E", "L", "L", "A"], hint: "Brilla nel cielo notturno", difficulty: "medium", category: "space" },
  { word: "CAVALLO", image: "🐴", letters: ["C", "A", "V", "A", "L", "L", "O"], hint: "Animale che galoppa", difficulty: "medium", category: "animals" },
  { word: "SCUOLA", image: "🏫", letters: ["S", "C", "U", "O", "L", "A"], hint: "Posto dove i bambini imparano", difficulty: "medium", category: "places" },
  { word: "FAMIGLIA", image: "👨‍👩‍👧‍👦", letters: ["F", "A", "M", "I", "G", "L", "I", "A"], hint: "Genitori e figli insieme", difficulty: "medium", category: "people" },
  { word: "PIANETA", image: "🪐", letters: ["P", "I", "A", "N", "E", "T", "A"], hint: "Grande corpo celeste", difficulty: "medium", category: "space" },

  // Hard
  { word: "ASTRONAUTA", image: "👨‍🚀", letters: ["A", "S", "T", "R", "O", "N", "A", "U", "T", "A"], hint: "Persona che viaggia nello spazio", difficulty: "hard", category: "space" },
  { word: "FARFALLA", image: "🦋", letters: ["F", "A", "R", "F", "A", "L", "L", "A"], hint: "Insetto con ali colorate", difficulty: "hard", category: "animals" },
  { word: "RAZZO", image: "🚀", letters: ["R", "A", "Z", "Z", "O"], hint: "Veicolo spaziale", difficulty: "hard", category: "space" },
  { word: "BIBLIOTECA", image: "📚", letters: ["B", "I", "B", "L", "I", "O", "T", "E", "C", "A"], hint: "Posto pieno di libri", difficulty: "hard", category: "places" },
  { word: "UNIVERSITÀ", image: "🎓", letters: ["U", "N", "I", "V", "E", "R", "S", "I", "T", "À"], hint: "Istituzione di istruzione superiore", difficulty: "hard", category: "places" }
];

// Portuguese Words
const portugueseWords: GameWord[] = [
  // Easy
  { word: "GATO", image: "🐱", letters: ["G", "A", "T", "O"], hint: "Animal que faz miau", difficulty: "easy", category: "animals" },
  { word: "CACHORRO", image: "🐶", letters: ["C", "A", "C", "H", "O", "R", "R", "O"], hint: "Melhor amigo do homem", difficulty: "easy", category: "animals" },
  { word: "SOL", image: "☀️", letters: ["S", "O", "L"], hint: "Estrela brilhante no nosso céu", difficulty: "easy", category: "nature" },
  { word: "CASA", image: "🏠", letters: ["C", "A", "S", "A"], hint: "Lugar onde você mora", difficulty: "easy", category: "places" },
  { word: "ÁGUA", image: "💧", letters: ["Á", "G", "U", "A"], hint: "Líquido transparente que você bebe", difficulty: "easy", category: "nature" },
  { word: "PÃO", image: "🍞", letters: ["P", "Ã", "O"], hint: "Alimento básico feito de farinha", difficulty: "easy", category: "food" },
  { word: "FLOR", image: "🌸", letters: ["F", "L", "O", "R"], hint: "Parte colorida de uma planta", difficulty: "easy", category: "nature" },
  { word: "LUA", image: "🌙", letters: ["L", "U", "A"], hint: "Satélite da Terra", difficulty: "easy", category: "space" },
  { word: "AMOR", image: "❤️", letters: ["A", "M", "O", "R"], hint: "Sentimento profundo de carinho", difficulty: "easy", category: "emotions" },
  { word: "CRIANÇA", image: "👶", letters: ["C", "R", "I", "A", "N", "Ç", "A"], hint: "Pessoa muito jovem", difficulty: "easy", category: "people" },

  // Medium
  { word: "ESTRELA", image: "⭐", letters: ["E", "S", "T", "R", "E", "L", "A"], hint: "Brilha no céu noturno", difficulty: "medium", category: "space" },
  { word: "CAVALO", image: "🐴", letters: ["C", "A", "V", "A", "L", "O"], hint: "Animal que galopa", difficulty: "medium", category: "animals" },
  { word: "ESCOLA", image: "🏫", letters: ["E", "S", "C", "O", "L", "A"], hint: "Lugar onde as crianças aprendem", difficulty: "medium", category: "places" },
  { word: "FAMÍLIA", image: "👨‍👩‍👧‍👦", letters: ["F", "A", "M", "Í", "L", "I", "A"], hint: "Pais e filhos juntos", difficulty: "medium", category: "people" },
  { word: "PLANETA", image: "🪐", letters: ["P", "L", "A", "N", "E", "T", "A"], hint: "Grande corpo celeste", difficulty: "medium", category: "space" },

  // Hard
  { word: "ASTRONAUTA", image: "👨‍🚀", letters: ["A", "S", "T", "R", "O", "N", "A", "U", "T", "A"], hint: "Pessoa que viaja pelo espaço", difficulty: "hard", category: "space" },
  { word: "BORBOLETA", image: "🦋", letters: ["B", "O", "R", "B", "O", "L", "E", "T", "A"], hint: "Inseto com asas coloridas", difficulty: "hard", category: "animals" },
  { word: "FOGUETE", image: "🚀", letters: ["F", "O", "G", "U", "E", "T", "E"], hint: "Veículo espacial", difficulty: "hard", category: "space" },
  { word: "BIBLIOTECA", image: "📚", letters: ["B", "I", "B", "L", "I", "O", "T", "E", "C", "A"], hint: "Lugar cheio de livros", difficulty: "hard", category: "places" },
  { word: "UNIVERSIDADE", image: "🎓", letters: ["U", "N", "I", "V", "E", "R", "S", "I", "D", "A", "D", "E"], hint: "Instituição de ensino superior", difficulty: "hard", category: "places" }
];

// Japanese Words (Hiragana)
const japaneseWords: GameWord[] = [
  // Easy
  { word: "ねこ", image: "🐱", letters: ["ね", "こ"], hint: "にゃんと鳴く動物", difficulty: "easy", category: "animals" },
  { word: "いぬ", image: "🐶", letters: ["い", "ぬ"], hint: "人間の最良の友達", difficulty: "easy", category: "animals" },
  { word: "たいよう", image: "☀️", letters: ["た", "い", "よ", "う"], hint: "空の明るい星", difficulty: "easy", category: "nature" },
  { word: "いえ", image: "🏠", letters: ["い", "え"], hint: "あなたが住む場所", difficulty: "easy", category: "places" },
  { word: "みず", image: "💧", letters: ["み", "ず"], hint: "透明な飲み物", difficulty: "easy", category: "nature" },
  { word: "パン", image: "🍞", letters: ["パ", "ン"], hint: "小麦粉で作った基本食品", difficulty: "easy", category: "food" },
  { word: "はな", image: "🌸", letters: ["は", "な"], hint: "植物のカラフルな部分", difficulty: "easy", category: "nature" },
  { word: "つき", image: "🌙", letters: ["つ", "き"], hint: "地球の衛星", difficulty: "easy", category: "space" },
  { word: "あい", image: "❤️", letters: ["あ", "い"], hint: "深い愛情の感情", difficulty: "easy", category: "emotions" },
  { word: "こども", image: "👶", letters: ["こ", "ど", "も"], hint: "とても若い人", difficulty: "easy", category: "people" },

  // Medium
  { word: "ほし", image: "⭐", letters: ["ほ", "し"], hint: "夜空で輝く", difficulty: "medium", category: "space" },
  { word: "うま", image: "🐴", letters: ["う", "ま"], hint: "ギャロップする動物", difficulty: "medium", category: "animals" },
  { word: "がっこう", image: "🏫", letters: ["が", "っ", "こ", "う"], hint: "子供たちが学ぶ場所", difficulty: "medium", category: "places" },
  { word: "かぞく", image: "👨‍👩‍👧‍👦", letters: ["か", "ぞ", "く"], hint: "両親と子供たち", difficulty: "medium", category: "people" },
  { word: "わくせい", image: "🪐", letters: ["わ", "く", "せ", "い"], hint: "大きな天体", difficulty: "medium", category: "space" },

  // Hard
  { word: "うちゅうひこうし", image: "👨‍🚀", letters: ["う", "ち", "ゅ", "う", "ひ", "こ", "う", "し"], hint: "宇宙を旅する人", difficulty: "hard", category: "space" },
  { word: "ちょうちょう", image: "🦋", letters: ["ち", "ょ", "う", "ち", "ょ", "う"], hint: "色とりどりの羽を持つ昆虫", difficulty: "hard", category: "animals" },
  { word: "ロケット", image: "🚀", letters: ["ロ", "ケ", "ッ", "ト"], hint: "宇宙船", difficulty: "hard", category: "space" },
  { word: "としょかん", image: "📚", letters: ["と", "し", "ょ", "か", "ん"], hint: "本がたくさんある場所", difficulty: "hard", category: "places" },
  { word: "だいがく", image: "🎓", letters: ["だ", "い", "が", "く"], hint: "高等教育機関", difficulty: "hard", category: "places" }
];

// Chinese Words (Simplified)
const chineseWords: GameWord[] = [
  // Easy
  { word: "猫", image: "🐱", letters: ["猫"], hint: "会喵喵叫的动物", difficulty: "easy", category: "animals" },
  { word: "狗", image: "🐶", letters: ["狗"], hint: "人类最好的朋友", difficulty: "easy", category: "animals" },
  { word: "太阳", image: "☀️", letters: ["太", "阳"], hint: "天空中明亮的星", difficulty: "easy", category: "nature" },
  { word: "家", image: "🏠", letters: ["家"], hint: "你居住的地方", difficulty: "easy", category: "places" },
  { word: "水", image: "💧", letters: ["水"], hint: "透明的液体，你喝的", difficulty: "easy", category: "nature" },
  { word: "面包", image: "🍞", letters: ["面", "包"], hint: "用面粉做的基本食物", difficulty: "easy", category: "food" },
  { word: "花", image: "🌸", letters: ["花"], hint: "植物彩色的部分", difficulty: "easy", category: "nature" },
  { word: "月亮", image: "🌙", letters: ["月", "亮"], hint: "地球的卫星", difficulty: "easy", category: "space" },
  { word: "爱", image: "❤️", letters: ["爱"], hint: "深深的感情", difficulty: "easy", category: "emotions" },
  { word: "孩子", image: "👶", letters: ["孩", "子"], hint: "很年轻的人", difficulty: "easy", category: "people" },

  // Medium
  { word: "星星", image: "⭐", letters: ["星", "星"], hint: "在夜空中闪烁", difficulty: "medium", category: "space" },
  { word: "马", image: "🐴", letters: ["马"], hint: "会奔跑的动物", difficulty: "medium", category: "animals" },
  { word: "学校", image: "🏫", letters: ["学", "校"], hint: "孩子们学习的地方", difficulty: "medium", category: "places" },
  { word: "家庭", image: "👨‍👩‍👧‍👦", letters: ["家", "庭"], hint: "父母和孩子在一起", difficulty: "medium", category: "people" },
  { word: "行星", image: "🪐", letters: ["行", "星"], hint: "大的天体", difficulty: "medium", category: "space" },

  // Hard
  { word: "宇航员", image: "👨‍🚀", letters: ["宇", "航", "员"], hint: "去太空旅行的人", difficulty: "hard", category: "space" },
  { word: "蝴蝶", image: "🦋", letters: ["蝴", "蝶"], hint: "有彩色翅膀的昆虫", difficulty: "hard", category: "animals" },
  { word: "火箭", image: "🚀", letters: ["火", "箭"], hint: "太空飞行器", difficulty: "hard", category: "space" },
  { word: "图书馆", image: "📚", letters: ["图", "书", "馆"], hint: "满是书的地方", difficulty: "hard", category: "places" },
  { word: "大学", image: "🎓", letters: ["大", "学"], hint: "高等教育机构", difficulty: "hard", category: "places" }
];

// Russian Words
const russianWords: GameWord[] = [
  // Easy
  { word: "КОТ", image: "🐱", letters: ["К", "О", "Т"], hint: "Животное, которое мяукает", difficulty: "easy", category: "animals" },
  { word: "СОБАКА", image: "🐶", letters: ["С", "О", "Б", "А", "К", "А"], hint: "Лучший друг человека", difficulty: "easy", category: "animals" },
  { word: "СОЛНЦЕ", image: "☀️", letters: ["С", "О", "Л", "Н", "Ц", "Е"], hint: "Яркая звезда в нашем небе", difficulty: "easy", category: "nature" },
  { word: "ДОМ", image: "🏠", letters: ["Д", "О", "М"], hint: "Место, где ты живёшь", difficulty: "easy", category: "places" },
  { word: "ВОДА", image: "💧", letters: ["В", "О", "Д", "А"], hint: "Прозрачная жидкость, которую ты пьёшь", difficulty: "easy", category: "nature" },
  { word: "ХЛЕБ", image: "🍞", letters: ["Х", "Л", "Е", "Б"], hint: "Основная еда из муки", difficulty: "easy", category: "food" },
  { word: "ЦВЕТОК", image: "🌸", letters: ["Ц", "В", "Е", "Т", "О", "К"], hint: "Цветная часть растения", difficulty: "easy", category: "nature" },
  { word: "ЛУНА", image: "🌙", letters: ["Л", "У", "Н", "А"], hint: "Спутник Земли", difficulty: "easy", category: "space" },
  { word: "ЛЮБОВЬ", image: "❤️", letters: ["Л", "Ю", "Б", "О", "В", "Ь"], hint: "Глубокое чувство привязанности", difficulty: "easy", category: "emotions" },
  { word: "РЕБЁНОК", image: "👶", letters: ["Р", "Е", "Б", "Ё", "Н", "О", "К"], hint: "Очень молодой человек", difficulty: "easy", category: "people" },

  // Medium
  { word: "ЗВЕЗДА", image: "⭐", letters: ["З", "В", "Е", "З", "Д", "А"], hint: "Светит в ночном небе", difficulty: "medium", category: "space" },
  { word: "ЛОШАДЬ", image: "🐴", letters: ["Л", "О", "Ш", "А", "Д", "Ь"], hint: "Животное, которое скачет галопом", difficulty: "medium", category: "animals" },
  { word: "ШКОЛА", image: "🏫", letters: ["Ш", "К", "О", "Л", "А"], hint: "Место, где дети учатся", difficulty: "medium", category: "places" },
  { word: "СЕМЬЯ", image: "👨‍👩‍👧‍👦", letters: ["С", "Е", "М", "Ь", "Я"], hint: "Родители и дети вместе", difficulty: "medium", category: "people" },
  { word: "ПЛАНЕТА", image: "🪐", letters: ["П", "Л", "А", "Н", "Е", "Т", "А"], hint: "Большое небесное тело", difficulty: "medium", category: "space" },

  // Hard
  { word: "КОСМОНАВТ", image: "👨‍🚀", letters: ["К", "О", "С", "М", "О", "Н", "А", "В", "Т"], hint: "Человек, который путешествует в космос", difficulty: "hard", category: "space" },
  { word: "БАБОЧКА", image: "🦋", letters: ["Б", "А", "Б", "О", "Ч", "К", "А"], hint: "Насекомое с цветными крыльями", difficulty: "hard", category: "animals" },
  { word: "РАКЕТА", image: "🚀", letters: ["Р", "А", "К", "Е", "Т", "А"], hint: "Космический корабль", difficulty: "hard", category: "space" },
  { word: "БИБЛИОТЕКА", image: "📚", letters: ["Б", "И", "Б", "Л", "И", "О", "Т", "Е", "К", "А"], hint: "Место, полное книг", difficulty: "hard", category: "places" },
  { word: "УНИВЕРСИТЕТ", image: "🎓", letters: ["У", "Н", "И", "В", "Е", "Р", "С", "И", "Т", "Е", "Т"], hint: "Учреждение высшего образования", difficulty: "hard", category: "places" }
];

// Arabic Words
const arabicWords: GameWord[] = [
  // Easy
  { word: "قط", image: "🐱", letters: ["ق", "ط"], hint: "حيوان يموء", difficulty: "easy", category: "animals" },
  { word: "كلب", image: "🐶", letters: ["ك", "ل", "ب"], hint: "أفضل صديق للإنسان", difficulty: "easy", category: "animals" },
  { word: "شمس", image: "☀️", letters: ["ش", "م", "س"], hint: "نجم مضيء في سماءنا", difficulty: "easy", category: "nature" },
  { word: "بيت", image: "🏠", letters: ["ب", "ي", "ت"], hint: "المكان الذي تعيش فيه", difficulty: "easy", category: "places" },
  { word: "ماء", image: "💧", letters: ["م", "ا", "ء"], hint: "سائل شفاف تشربه", difficulty: "easy", category: "nature" },
  { word: "خبز", image: "🍞", letters: ["خ", "ب", "ز"], hint: "طعام أساسي مصنوع من الدقيق", difficulty: "easy", category: "food" },
  { word: "زهرة", image: "🌸", letters: ["ز", "ه", "ر", "ة"], hint: "الجزء الملون من النبات", difficulty: "easy", category: "nature" },
  { word: "قمر", image: "🌙", letters: ["ق", "م", "ر"], hint: "قمر الأرض", difficulty: "easy", category: "space" },
  { word: "حب", image: "❤️", letters: ["ح", "ب"], hint: "شعور عميق بالمودة", difficulty: "easy", category: "emotions" },
  { word: "طفل", image: "👶", letters: ["ط", "ف", "ل"], hint: "شخص صغير جداً", difficulty: "easy", category: "people" },

  // Medium
  { word: "نجمة", image: "⭐", letters: ["ن", "ج", "م", "ة"], hint: "تضيء في السماء الليلي", difficulty: "medium", category: "space" },
  { word: "حصان", image: "🐴", letters: ["ح", "ص", "ا", "ن"], hint: "حيوان يجري بسرعة", difficulty: "medium", category: "animals" },
  { word: "مدرسة", image: "🏫", letters: ["م", "د", "ر", "س", "ة"], hint: "مكان يتعلم فيه الأطفال", difficulty: "medium", category: "places" },
  { word: "عائلة", image: "👨‍👩‍👧‍👦", letters: ["ع", "ا", "ئ", "ل", "ة"], hint: "الآباء والأطفال معاً", difficulty: "medium", category: "people" },
  { word: "كوكب", image: "🪐", letters: ["ك", "و", "ك", "ب"], hint: "جسم سماوي كبير", difficulty: "medium", category: "space" },

  // Hard
  { word: "رائد فضاء", image: "👨‍🚀", letters: ["ر", "ا", "ئ", "د", " ", "ف", "ض", "ا", "ء"], hint: "شخص يسافر إلى الفضاء", difficulty: "hard", category: "space" },
  { word: "فراشة", image: "🦋", letters: ["ف", "ر", "ا", "ش", "ة"], hint: "حشرة ذات أجنحة ملونة", difficulty: "hard", category: "animals" },
  { word: "صاروخ", image: "🚀", letters: ["ص", "ا", "ر", "و", "خ"], hint: "مركبة فضائية", difficulty: "hard", category: "space" },
  { word: "مكتبة", image: "📚", letters: ["م", "ك", "ت", "ب", "ة"], hint: "مكان مليء بالكتب", difficulty: "hard", category: "places" },
  { word: "جامعة", image: "🎓", letters: ["ج", "ا", "م", "ع", "ة"], hint: "مؤسسة تعليم عالي", difficulty: "hard", category: "places" }
];

export const wordDatabase: LanguageWordSet[] = [
  { language: "English", code: "en", words: englishWords },
  { language: "Español", code: "es", words: spanishWords },
  { language: "Français", code: "fr", words: frenchWords },
  { language: "Deutsch", code: "de", words: germanWords },
  { language: "Italiano", code: "it", words: italianWords },
  { language: "Português", code: "pt", words: portugueseWords },
  { language: "日本語", code: "ja", words: japaneseWords },
  { language: "中文", code: "zh", words: chineseWords },
  { language: "Русский", code: "ru", words: russianWords },
  { language: "العربية", code: "ar", words: arabicWords }
];

export function getWordsByLanguage(languageCode: string): GameWord[] {
  const languageSet = wordDatabase.find(lang => lang.code === languageCode);
  return languageSet ? languageSet.words : englishWords;
}

export function getWordsByDifficulty(languageCode: string, difficulty: 'easy' | 'medium' | 'hard'): GameWord[] {
  const words = getWordsByLanguage(languageCode);
  return words.filter(word => word.difficulty === difficulty);
}

export function getWordsByCategory(languageCode: string, category: string): GameWord[] {
  const words = getWordsByLanguage(languageCode);
  return words.filter(word => word.category === category);
}

export function getRandomWords(languageCode: string, count: number = 10): GameWord[] {
  const words = getWordsByLanguage(languageCode);
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getAllCategories(languageCode: string): string[] {
  const words = getWordsByLanguage(languageCode);
  const categories = [...new Set(words.map(word => word.category))];
  return categories.sort();
}