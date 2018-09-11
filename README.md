# SPIN
SPIN (**s**venska **p**erson**i**dentifukations**n**ummer) är en javascript-klass som underlättar arbete med person- och samordningsnummer. Klassen kan tex. användas för validering och formatering av nummer.

### Exempel på användning
```javascript
<script src="spin.min.js"></script>
<script>
    var s = new SPIN("850101-0261");
    console.log(s.valid()); // true
</script>
```

### Metoder
| Metod | Beskrivning | Parameter | Typ | Returnerar |
|---|---|---|---|---|
| .set() | Speciferar ett person- eller samordningsnummer | input | String | - |
| .id() | Returnerar ID-nummer i 12-siffrigt format, alternativt *FALSE* om ID-numret är ogiltigt | - | - | String&vert;Bool |
| .gender() | Returnerar 'MALE' eller 'FEMALE', alternativt *FALSE* om ID-numret är ogiltigt | - | - | String&vert;Bool |
| .age() | Returnerar ålder i antal år, alternativt *FALSE* om ID-numret är ogiltigt | - | - | Number&vert;Bool |
| .type() | Returnerar 'SAN' för samordningsnummer och 'PEN' för personnummer. Returnerar *FALSE* om ID-numret är ogiltigt | - | - | String&vert;Bool |
| .valid() | Returnerar *TRUE* om ID-numret är giltigt, annars *FALSE* | - | - | Bool |

### Valideringsregler
Vid validering av ett ID-nummer kontrolleras födelsedatum och checksumma/kontrollsiffra. För födelsedatum tar kontrollen höjd för skottdagar och -år.

### Indata
Klassen stödjer ID-nummer som är formaterade som både 10 och 12 siffror. För 10-siffriga ID-nummer stödjs även plusseparator mellan födelsedatum och födelsenummer, dvs. YYMMDD+XXXX, som används för att markera att födelseåret inträffade för mer än 100 år sedan.

# SPIN Slim
text
