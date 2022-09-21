# ODEV1: Klavyeden Q veya q karakteri girilene kadar not girişi yapan ve bu karakterlerden birisi girildiğinde O ana kadar girilen tüm notların ortalamasını hesaplayarak konsola ortalamayı bastıran uygulamayı yazınız.

# ODEV2 : Derste yazılan tahmin oyununu tekrar tekrar oynanabilecek hale getiriniz.

# Her oyun bittikten sonra tekrar oynamak istermisini E/H? diye sorunuz.

# E veya e girilirse oyun tekrardan başlasın aksi takdirde bitsin.

let hak = 5;
const rastgele = Math.round(Math.random() \* 100);
console.log(rastgele);

let tahmin;
do {
tahmin = Number(prompt("Lutfen 0-100 arasinda bir tahmin giriniz:"));
hak -= 1;
if (tahmin === rastgele) {
console.log(`Tebrikler ${5 - hak} kerede bildiniz.`);
break;
} else if (tahmin < rastgele) {
console.log("ARTTIR ⬆️");
} else {
console.log("AZALT ⬇️");
}
} while (hak > 0);

if (tahmin !== rastgele) {
console.log("Uzgunuz oyunu kaybettiniz 😔😔");
}
