import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { CryptoContext } from "../context/CryptoContext";
import SecondBlur from "../components/SecondBlur";

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const cryptoData = useContext(CryptoContext);

  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      console.log("Antes de la llamada a la API");
      const response = await fetch("https://api.coingecko.com/api/v3/news");
      const data = await response.json();
      console.log("Datos de la API:", data);
      setNews(data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  return (
    <>
      <SecondBlur />
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.backgroundColor },
        ]}
      >
        <Text style={[styles.heading, { color: theme.title }]}>
          Crypto Wallet
        </Text>

        <Text style={[styles.heading2, { color: theme.title }]}>
          Noticias Recientes
        </Text>

        <ScrollView horizontal contentContainerStyle={styles.newsContainer}>
          {news.data &&
            news.data.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.newsCard, { backgroundColor: theme.cardColor }]}
                onPress={() => Linking.openURL(item.url)}
              >
                <Text style={[styles.newsTitle, { color: theme.textColor }]}>
                  {item.title}
                </Text>
                <Text style={[styles.newsAuthor, { color: theme.textColor }]}>
                  {item.news_site}
                </Text>
                {item.thumb_2x && (
                  <Image
                    source={{ uri: item.thumb_2x }}
                    style={styles.newsThumbnail}
                  />
                )}
                {item.description.length > 100 ? (
                  <Text
                    style={[styles.newsDescription, { color: theme.textColor }]}
                  >
                    {`${item.description.substring(0, 100)}... `}
                    <Text style={{ textDecorationLine: "underline", color: theme.textColor }}>
                      Toca para continuar leyendo
                    </Text>
                  </Text>
                ) : (
                  <Text
                    style={[styles.newsDescription, { color: theme.textColor }]}
                  >
                    {item.description}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
        </ScrollView>

        <Text style={[styles.heading2, { color: theme.title }]}>
          Criptomonedas
        </Text>

        {cryptoData &&
          cryptoData.map((crypto) => (
            <View
              key={crypto.id}
              style={[styles.cryptoCard, { backgroundColor: theme.cardColor }]}
            >
              <View style={styles.cryptoHeader}>
                <Text style={[styles.cryptoName, { color: theme.textColor }]}>
                  {crypto.name}
                </Text>
                <Image
                  source={{ uri: crypto.icon }}
                  style={styles.cryptoIcon}
                />
              </View>
              <View style={styles.cryptoInfo}>
                <Text style={[styles.text, { color: theme.textColor }]}>
                  Price: ${crypto.price.toLocaleString()}
                </Text>
                <Text style={[styles.text, { color: theme.textColor }]}>
                  Change (24h): {crypto.change24h.toLocaleString()}%
                </Text>
                <Text style={[styles.text, { color: theme.textColor }]}>
                  Market Cap: ${crypto.marketCap.toLocaleString()}
                </Text>
                <Text style={[styles.text, { color: theme.textColor }]}>
                  Volume (24h): ${crypto.volume.toLocaleString()}
                </Text>
              </View>
            </View>
          ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  heading2: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
  },
  cryptoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    width: "100%",
    borderWidth: 0,
    borderColor: "#ccc",
  },
  cryptoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cryptoName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cryptoIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  cryptoInfo: {
    marginLeft: 10,
    fontSize: 10,
  },
  newsContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "flex-start",
  },
  newsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 15,
    marginRight: 10,
    width: 300,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  newsAuthor: {
    fontSize: 14,
    marginBottom: 5,
    fontStyle: "italic",
  },
  newsDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  newsThumbnail: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Home;
