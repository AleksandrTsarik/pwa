// Статические данные для демо
const DEMO_DATA = {
  cities: [
    {
      cityName: "Москва",
      cityLocaltion: [55.755864, 37.617698],
      site: ['Центр','Дмитровка','Останкино','Лефортово','Перово','Вешняки','Сукино болото','Юго-запад','Юго-восток','Север','Юг','Запад','Восток'],
      company: [
        {
          name: "DDX Fitness",
          description: "Фитнес-клуб",
          coordinates: [55.752085, 37.596237],
          address: "​Улица Новый Арбат, 11 ст1​-2 этаж",
          studio: "",
          phone: "+7 (495) 255‒59‒25",
          email: "info@ddxfitness.ru",
          website: "https://ddxfitness.ru",
          rating: "3",
          logo: "/img/ddx.png",
          marker: "/img/marker.png",
          price: "от 1700 р",
          time: "Открыто до 00:00",
          tags: [
            "Фитнес клуб",
            "Бассейн",
            "Аэробика",
            "Йога",
            "RX-тренировки",
            "ZUMBA",
            "+20 занятий",
          ],
          extra: [
            "Круглосуточный",
            "Только для женщин",
            "Только для мужчин",
            "Детские занятия",
            "Занятия для беременных",
            "Для грудничков",
            "Есть парковка",
            "Душ",
          ],
          cardType: ["gold", "silver"],
          sportType: ["плавание", "бег", "тренажерный зал", "кроссфит"],
          site: ["Центр"],
        },
        {
          name: "DDX Fitness",
          studio: "small",
          description: "Фитнес-клуб",
          address: "Страстной бульвар, 10 к1",
          coordinates: [55.766106, 37.611482],
          phone: "+7 (495) 255‒59‒25",
          email: "info@ddxfitness.ru",
          website: "https://ddxfitness.ru",
          rating: "3.5",
          logo: "/img/ddx.png",
          marker: "/img/marker.png",
          price: "от 1700 р",
          time: "Открыто до 01:00",
          tags: [
            "Фитнес клуб",
            "Бассейн",
            "Аэробика",
            "Йога",
            "RX-тренировки",
            "ZUMBA",
            "+10 занятий",
          ],
          cardType: ["gold", "silver"],
          sportType: ["бег", "тренажерный зал", "кроссфит"],
          site: ["Центр"],
        },
        {
          name: "DDX Fitness",
          description: "Фитнес-клуб",
          studio: "",
          address: "​Ходынский бульвар, 4​3 этаж",
          coordinates: [55.784865, 37.531640],
          phone: "+7 (495) 255‒59‒25",
          email: "info@ddxfitness.ru",
          website: "https://ddxfitness.ru",
          rating: "3.8",
          logo: "/img/ddx.png",
          marker: "/img/marker.png",
          price: "от 1700 р",
          time: "Открыто до 22:00",
          tags: ["Фитнес клуб", "Бассейн", "Аэробика", "Йога", "+20 занятий"],
          cardType: ["gold", "silver", "black"],
          sportType: ["плавание", "бег", "тренажерный зал", "кроссфит"],
          site: ["Север"],
        },
        {
          name: "DDX Fitness",
          description: "Фитнес-клуб",
          studio: "small",
          address: "​Улица Маршала Чуйкова, 3",
          coordinates: [55.703885, 37.764986],
          phone: "+7 (495) 255‒59‒25",
          email: "info@ddxfitness.ru",
          website: "https://ddxfitness.ru",
          rating: "4",
          logo: "/img/ddx.png",
          marker: "/img/marker.png",
          price: "от 1700 р",
          time: "Открыто до 23:00",
          tags: [
            "Фитнес клуб",
            "Бассейн",
            "Аэробика",
            "Йога",
            "RX-тренировки",
            "ZUMBA",
            "+30 занятий",
          ],
          cardType: ["gold"],
          sportType: ["тренажерный зал"],
          site: ["Юго-восток"],
        },
        {
          name: "Xfit",
          description: "Фитнес-клуб",
          studio: "small",
          address: "​Улица Правды, 21 ст2",
          coordinates: [55.788044, 37.579538],
          phone: "+7 (495) 432‒53‒09",
          email: "pvd-manager@xfit.ru",
          website: "pravda.xfit.ru",
          rating: "5",
          logo: "/img/ddx.png",
          marker: "/img/marker.png",
          price: "от 1700 р",
          time: "Открыто до 01:00",
          tags: [
            "Фитнес клуб",
            "Бассейн",
            "Аэробика",
            "Йога",
            "RX-тренировки",
            "ZUMBA",
            "+20 занятий",
          ],
          cardType: ["black"],
          sportType: ["плавание", "бег", "тренажерный зал", "кроссфит"],
          site: ["Север"],
        },
        {
          name: "Xfit",
          description: "Фитнес-клуб",
          studio: "",
          address: "Ленинградский проспект, 31а ст1",
          coordinates: [55.783600, 37.560197],
          phone: "+7 (495) 172‒39‒47",
          email: "monsport-manager@xfit.ru",
          website: "https://monarh.xfit.ru",
          rating: "4.5",
          logo: "/img/ddx.png",
          marker: "/img/marker.png",
          price: "от 1700 р",
          time: "Открыто до 01:00",
          tags: [
            "Фитнес клуб",
            "Бассейн",
            "Аэробика",
            "Йога",
            "RX-тренировки",
            "ZUMBA",
            "+50 занятий",
          ],
          cardType: ["black"],
          sportType: ["плавание", "бег", "тренажерный зал", "кроссфит"],
          site: ["Север"],
        },
        {
          name: "Xfit",
          description: "Фитнес-клуб",
          studio: "small",
          address: "Смоленская улица, 8",
          coordinates: [55.746274, 37.580391],
          phone: "+7 (495) 859‒45‒57",
          email: "smolenskaya@xfit.su",
          website: "www.xfit.ru",
          rating: "1.5",
          logo: "/img/ddx.png",
          marker: "/img/marker.png",
          price: "",
          time: "Открыто до 01:00",
          tags: [
            "Фитнес клуб",
            "Бассейн",
            "Аэробика",
            "Йога",
            "RX-тренировки",
            "ZUMBA",
            "+10 занятий",
          ],
          cardType: ["gold"],
          sportType: ["тренажерный зал"],
          site: ["Центр"],
        },
      ],
    },
    {
      cityName: "Санкт-Петербург",
      cityLocaltion: [59.938784, 30.314997],
      site: ['Центральный','Невский','Фруннзенский','Пушкинский','Кировский','Московский','Адмералтейский','Петроградский','Курортный',],
      company: [
        {
          name: "DDX Fitness",
          description: "Фитнес-клуб",
          coordinates: [59.934758, 30.334275],
          address: "Невский проспект, 48",
          studio: "",
          phone: "+7 (812) 214‒52‒15",
          email: "info@ddxfitness.ru",
          website: "www.ddxfitness.ru",
          rating: "3",
          logo: "/img/ddx.png",
          marker: "/img/marker.png",
          price: "от 1700 р",
          time: "Открыто до 22:00",
          tags: [
            "Фитнес клуб",
            "Бассейн",
            "Аэробика",
            "Йога",
            "RX-тренировки",
            "ZUMBA",
            "+20 занятий",
          ],
          extra: [
            "Круглосуточный",
            "Только для женщин",
            "Только для мужчин",
            "Детские занятия",
            "Занятия для беременных",
            "Для грудничков",
            "Есть парковка",
            "Душ",
          ],
          cardType: ["silver",],
          sportType: ["плавание", "бег", "тренажерный зал", "кроссфит"],
          site: ["Центральный"],
        },
        {
          name: "DDX Fitness",
          description: "Фитнес-клуб",
          coordinates: [59.863328, 30.404083],
          address: "ТРК Южный полюс​Пражская улица, 48",
          studio: "",
          phone: "+7 (812) 214‒52‒15",
          email: "info@ddxfitness.ru",
          website: "ddxfitness.ru",
          rating: "3",
          logo: "/img/ddx.png",
          marker: "/img/marker.png",
          price: "от 1700 р",
          time: "Открыто до 22:00",
          tags: [
            "Фитнес клуб",
            "Бассейн",
            "Аэробика",
            "Йога",
            "RX-тренировки",
            "ZUMBA",
            "+20 занятий",
          ],
          extra: [
            "Круглосуточный",
            "Только для женщин",
            "Только для мужчин",
            "Детские занятия",
            "Занятия для беременных",
            "Душ",
          ],
          cardType: ["black"],
          sportType: ["плавание", "бег", "тренажерный зал"],
          site: ["Московский"],
        },
      ],
    },
  ],
};

// Конфигурация API
const API_CONFIG = {
  baseURL: 'https://api.example.com', // Замените на реальный URL API
  endpoints: {
    cities: '/api/cities',
    companies: '/api/companies',
    filters: '/api/filters'
  }
};

// Класс для работы с API (имитация)
class CompanyAPI {
  constructor() {
    this.baseURL = API_CONFIG.baseURL;
  }

  // Имитация задержки сети
  async simulateNetworkDelay(ms = 100) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Общий метод для POST запросов (имитация)
  async makeRequest(endpoint, data = {}) {
    try {
      // Имитируем задержку сети
      await this.simulateNetworkDelay();
      
      console.log(`API Request: ${endpoint}`, data);

      // Обрабатываем разные endpoints
      switch (endpoint) {
        case API_CONFIG.endpoints.cities:
          return { data: DEMO_DATA.cities };
        
        case API_CONFIG.endpoints.companies:
          return this.filterCompanies(data);
        
        case API_CONFIG.endpoints.filters:
          return this.getFilterOptions();
        
        default:
          throw new Error(`Unknown endpoint: ${endpoint}`);
      }
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Фильтрация компаний по переданным фильтрам
  filterCompanies(filters = {}) {
    let filteredCompanies = [];

    DEMO_DATA.cities.forEach((city) => {
      // Фильтр по городу
      if (filters.city && city.cityName !== filters.city) {
        return;
      }

      city.company.forEach((company) => {
        let shouldInclude = true;

        // Фильтр по расположению (site)
        if (filters.site && (!company.site || !company.site.includes(filters.site))) {
          shouldInclude = false;
        }

        // Фильтр по виду спорта
        if (filters.sportType && filters.sportType.length > 0) {
          const hasMatchingSportType = filters.sportType.some(
            (sportType) => company.sportType && company.sportType.includes(sportType)
          );
          if (!hasMatchingSportType) {
            shouldInclude = false;
          }
        }

        // Фильтр по типу карты
        if (filters.cardType && filters.cardType.length > 0) {
          const hasMatchingCardType = filters.cardType.some(
            (cardType) => company.cardType && company.cardType.includes(cardType)
          );
          if (!hasMatchingCardType) {
            shouldInclude = false;
          }
        }

        // Фильтр по дополнительным условиям
        if (filters.extra && filters.extra.length > 0) {
          const hasMatchingExtra = filters.extra.some(
            (extra) => company.extra && company.extra.includes(extra)
          );
          if (!hasMatchingExtra) {
            shouldInclude = false;
          }
        }

        if (shouldInclude) {
          filteredCompanies.push({
            ...company,
            cityName: city.cityName,
          });
        }
      });
    });

    return { data: filteredCompanies };
  }

  // Получение опций фильтров
  getFilterOptions() {
    const allSportTypes = new Set();
    const allCardTypes = new Set();
    const allExtra = new Set();

    DEMO_DATA.cities.forEach((city) => {
      city.company.forEach((company) => {
        if (company.sportType && Array.isArray(company.sportType)) {
          company.sportType.forEach((sport) => allSportTypes.add(sport));
        }
        if (company.cardType && Array.isArray(company.cardType)) {
          company.cardType.forEach((card) => allCardTypes.add(card));
        }
        if (company.extra && Array.isArray(company.extra)) {
          company.extra.forEach((item) => allExtra.add(item));
        }
      });
    });

    return {
      data: {
        sportTypes: Array.from(allSportTypes),
        cardTypes: Array.from(allCardTypes),
        extra: Array.from(allExtra)
      }
    };
  }

  // Получение всех городов
  async getCities() {
    return await this.makeRequest(API_CONFIG.endpoints.cities);
  }

  // Получение компаний по фильтрам
  async getCompanies(filters = {}) {
    return await this.makeRequest(API_CONFIG.endpoints.companies, filters);
  }

  // Получение опций фильтров
  async getFilterOptions() {
    return await this.makeRequest(API_CONFIG.endpoints.filters);
  }

  // Получение всех данных (города + компании) - для обратной совместимости
  async getAllData() {
    try {
      const [cities, companies] = await Promise.all([
        this.getCities(),
        this.getCompanies()
      ]);

      return {
        cities: cities.data || cities,
        companies: companies.data || companies
      };
    } catch (error) {
      console.error('Failed to fetch all data:', error);
      throw error;
    }
  }
}

// Создаем экземпляр API
const companyAPI = new CompanyAPI();

// Экспортируем API для использования в компонентах
export default companyAPI;

// Для обратной совместимости экспортируем также старые методы
export const getCities = () => companyAPI.getCities();
export const getCompanies = (filters) => companyAPI.getCompanies(filters);
export const getFilterOptions = () => companyAPI.getFilterOptions();
export const getAllData = () => companyAPI.getAllData();

// Экспортируем старые данные для обратной совместимости
export const demoCompany = DEMO_DATA;
