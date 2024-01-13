import React, { useState, useEffect } from 'react';

const Previsioni = ({ cityName, apiKey }) => {
  const [forecastData, setForecastData] = useState(null);
  const gradiC = 273.15; // Costante per convertire da Kelvin a Celsius

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`);
        
        if (!response.ok) {
          throw new Error('Errore nella chiamata API per le previsioni');
        }

        const data = await response.json();
        setForecastData(data);
        
        // Visualizza i log delle API
        console.log('Risposta API Previsioni:', data);
      } catch (error) {
        console.error('Errore durante il recupero dei dati delle previsioni:', error.message);
      }
    };

    fetchForecastData();
  }, [cityName, apiKey]);

  const createDayContainers = () => {
    const dayContainers = {};

    if (forecastData) {
      forecastData.list.forEach((item) => {
        const day = item.dt_txt.split(' ')[0]; // Estrai solo la parte della data (ignorando l'ora)
        if (!dayContainers[day]) {
          dayContainers[day] = [];
        }

        dayContainers[day].push(item);
      });
    }

    return dayContainers;
  };

  return (
    <div className="previsioni-container">
      <h2>Previsioni per i prossimi giorni</h2>
      {forecastData ? (
        <div>
          {Object.entries(createDayContainers()).map(([day, items], index) => (
            <div key={index} className="mb-4">
              <h3>{day}</h3>
              <div className="d-flex flex-wrap">
                {items.map((item, itemIndex) => (
                  <div key={itemIndex} className="card mx-2 mb-2" style={{ width: '18rem' }}>
                    <div className="card-body">
                      <p className="card-text">Data: {item.dt_txt}</p>
                      {item.main && (
                        <>
                          <p className="card-text">Temperatura Max: {(item.main.temp_max - gradiC).toFixed(2)}°C</p>
                          <p className="card-text">Temperatura Min: {(item.main.temp_min - gradiC).toFixed(2)}°C</p>
                        </>
                      )}
                      {item.weather && item.weather[0] && (
                        <>
                          <p className="card-text">Condizioni: {item.weather[0].description}</p>
                          {item.weather[0].main === 'Rain' || item.weather[0].main === 'Light Rain' ? (
                            <div style={{ backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToHL7n0h-G9DFZmOVdfGpbiCUTfi_prqqu5Q&usqp=CAU)', backgroundSize: 'cover', height: '200px' }}>
                              <p style={{ color: 'white', textAlign: 'center', padding: '10px' }}>Piove!</p>
                            </div>
                          ) : item.weather[0].main === 'Clouds' || item.weather[0].main === 'Overcast Clouds' ? (
                            <div style={{ backgroundImage: 'url(data:image/jpeg;base64,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)', backgroundSize: 'cover', height: '200px' }}>
                              <p style={{ color: 'white', textAlign: 'center', padding: '10px' }}>Nuvoloso!</p>
                            </div>
                          )    <p className="card-text">Condizioni: {item.weather[0].description}</p>
                          {item.weather[0].main === 'Rain' || item.weather[0].main === 'Light Rain' ? (
                            <div style={{ backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToHL7n0h-G9DFZmOVdfGpbiCUTfi_prqqu5Q&usqp=CAU)', backgroundSize: 'cover', height: '200px' }}>
                              <p style={{ color: 'white', textAlign: 'center', padding: '10px' }}>Piove!</p>
                            </div>
                          ) : item.weather[0].main === 'Clouds' || item.weather[0].main === 'Overcast Clouds' ? (
                            <div style={{ backgroundImage: 'url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMUExMUFBMWFxYWExYXGBAZExMYGBcXFhgXFxcSFxkZHikhGxwmHBgWIjIiJiosLy8vGCA1OjUtOSkuLywBCgoKDg0OHBAQGDEnISYxLjAuMC4uLi4uMDQ0Li4uMDQsLi4uLi4uLi4uLi8uLi4uLi4uLjcuLi4sNy4sLi4uLv/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUCAwYHAf/EAEYQAAIBAgIGBQgHBgMJAAAAAAABAgMRBCEFEjFBUWEGcYGRoRMiMlKxwdHwFEJTYpKT4RUjM3Ky4oKi8QcWNENjc4Ojwv/EABoBAQADAQEBAAAAAAAAAAAAAAACAwQBBQb/xAAxEQACAQIDBQgCAgIDAAAAAAAAAQIDEQQhMRITQZGxMlFhcYGhwfAi0ULhM/EFFCP/2gAMAwEAAhEDEQA/APcQAAAAAAAAAAAAAACFpDFamrzefUtpNKXFRdWpO2yEX3rd337jNipyjC0NXp16IuoRUpfloi6BD0ZV1qa4rJ9mzwsTC+E1OKkuJXKLi2mAASIgAAAAAAAAAAAAAAAAAAAAAAAAAwneztttkgDMELD4+Esn5r4P4k0hCcZq8XclKLi7NAAEyIAABpxFTVjKXBeO7xIWio2i5PbJ+C+WfNNVMow4u76ls8fYY/SIpJJ7Lcdx5mJr7NW6/j1f9GqEHu/Poj7gHqVZw3PNe1eF+4tSixVZa0Jxeaf6/Euozuk1sauXYKonFx7n7PP9ka8XlJ8eqMwAbTOAAAAa6tWMVeTSRHw+LU21FealnJ+CSIOpFSUW82SUW1e2RMABMiAAAAAAAAAAAAAAAAAAUePw8VUTeUZ71ue9+xm7Uq0/RevHh+m1dhL0hQ14Nb1mutbiPgsRrQ5rL4M8urTjTqPhfNNe68e+3ibFUcqa42yd/ZmzD6ShLJ+a+D2d5PKbGODV2s/E3aMw81m5NR3Q48+RZhsVOb2Wr+Ky58PuSITpQ2dpZeD+CzBAxulKdPJu8vUW3t4Fb9MxFX0I6keP92/sLa2NpUns6y7lm/0vVnKeGnNbWi72W9bBwk7yV+1pI1+ToL1PxL4lWtDTlnUq3fbLxbNi0FT9aXh8DHv5ttqgvVr4RdsU1k6r9EWEcLRlsUX1S+DJVKmopJbFsKKegY7ptdaT+Bj9ExFP0KmsuF//AJlkdji5U3eVC3jFp+1kcdKE1aNXnde+Z0YKHD6caerVhqvik/GLz7i2cteN4y27JKzN1HE06ybpu9uGj97c9DPUozpv8l68Of1mVatGCvJpfO5ECekJzdqcf8T+bLtIro6s/wB7d87uz58ywoz3JWRiqYucpbPZ6/1yLd3GCvr0IOMwzjHWnLWk8kvaWej6GpBLe831shQ/eVfuw+fF+wty/CU47TqJZaL5fncV5y2VF+f6QABuMoAAAAAAAAAAAAAAAAAAKTEryVRtejJX+e32l2aK+HjO2stjv+nUZ8TR3sLLVaFtKai89GQ8Fhr+fLrS95F0jpSTl5Ojm9jmvFR+JnpzHNWpQ9KW221J7Eub+dplgcJGjC79J7X7lyPPrVNm9Gk7JdqXwvHpojTFK29qK7fZX78DVg9FQh51S0pbc9ifvZJqYv1V2v4GipUcnn3H1RPN39ls0lZe7JSTk9qbuz5OpJ7WzU0bnEwkjLOLepJMwTa2G2GJkt9zUz4VKUqfZdvvI60nqSpunVWrJZ7r7exlfKlUw8taDvDevdJe82yRvw2Jv5st+V37GaqeI25LayktJLLn95BXgss1xTJtGrCvD2rfFkCpOVLWi+GT95ErwlQqKpD0W7OPti/cy81YVYxltWTT9qfsZ7EJf9qLTynHk13+XT1KpJUmms4P2Z80bQ1YK+15v3ImgHqwgoRUVwMcpOTbYABIiAAAAAAAAAAAAAAAAAADRiq6hGU3sir9fBd5t1le18+BS9Ja1owgvrO76o7F3tdxRia25pSn3deHuW0ae8qKPeadC0XOUq09rbt1737u8316us+W74m2UfJ04wXBL4v295ER8ziJbEVSXm/F/fhm2+3Jz9F5GyJvgjRFm2MiFNkZGyUTRJG1yNNSSWbdktrJTaORMGYldidP4eOWvrP7qb8dniR4dJaD3TXNxXubIvB15K6pvkyW9h3lyyJiq0YRcpNJLe/ZzPkdJUnCU1NNRV3xS6nmVej8DPGT8pUvGjF2jFb/ALq98uxcpYPATrzaldJa5Z+WfHj4LzSfJ1lBZamVbpBVrJ0qNHXys5tNvk7LKPW2fcNR0jGNozUFe+rel8GdfhcDCEVFJRitkFl38zKoorcfT0sNSp5xWffq+Zic5NWby9jk/wBq6RpZziqkf5YvL/x2a7UXGhelNKs1CX7uo8lFu6k+EZceTt2m+q0Uml9EQrJtWjU9bdLlLj17S4gdqDk+iWm5ybw9e/lI31ZPbJLbB8Wlnfeuq76w6AAAAAAAAAAAAAa5zSV20lxbsfK8JNebLVfGyftKfEYKondrX7W31ce4z1604L8YN9PbMtp04z1lb7yJtbSkVlFOT7kaJ1a0/uLufxPuGxlOOWpqPqv3vab5SUs4yTXIw1a05Rup38I5dc+he4qD7Hq8/wCiNounapK7u0nn2ojaU87E047lq+1tk7R38Sp2+0g4z/i11L+llVXLCR8ZLq/0W0/80n3RfQk455pciMb8Y/OXzvNB4mIb30vvBHaa/FGSZkmaz6mcjMlYwx2NjSg5zeS3b290VzKLCYGvjnrTfk6KeXB29VfWf3nl7D5WpPF4tUbvydO+tblbXfW3aJ3lGmopRikopJKK2JLYkfS/8fhVCCqS7T9u72MNWd3ZaFRhOjWGpr+EpP1qnnt9jy7kbK+i8M1Z0KXZTgn3pXLCrUIOIrJbWl1ux6RSc9pLojTlnQlqu+cJNtW5Pau2/YdVgMNGnCMYq0YrViurf1/qVLxG+L7U7lnhcSpQTXU1zAN9SoQq1QkOlJ8usj1cK/W8ACFVqESdXPIk4nDTWzPqIuHw8py1Us9/LmzgK/S+CnKdKtRXnpq7ula2cZO/DNdx8rUMbN3niWnwjOcV3RSR1VHBwgrek+L+B8qNcF3IA5SFbH0c41nUXBy17/jV+5lzobpbGclTrR8nPZrZ6jfB3zi+vvNtaEXut1FNpTR8aizylun7nxQB3oOQ6GaYk28PVfnRT1G9rS2w522rl1HXnQAAAAAAAAAaqtCMvSin88SFV0UtsJOL+d+0sgVVKFOp2l++epOFSUNGVeBoTjUesrpp+cnle6ZC029WtSnuy8JZ+DR0JUdIsPrU9ZbYO/Y8n7n2GPFYfZwsow4Z8s+lzRQq3rpy45GvSC2PrXz4miLNtCflKS4pf5l8feRIyPmsSvz2lxNMFk4vgbz43bM+KRT6Q6Q04XjFa72Np2iu3f2EaVGpWezTjf7xei9TkpKHaJH+z2ndVqj2uUVfvk++67jra1Sx5voHSOJoxkqNLXjJptulUkslbJxaN2lulFSrSlSlBQk3aTTfo746rzV8t+y59wzzCZpPpBVrVPI4ZP8AnS86XFq/ox5+w10+iFSXnVay1ntsnN9sm0X3RfRCpUldefJKU3vz2Q7PbcvnJI4Dz+v0UqQzpVU2t1nB9jTZv6O6edKo6WIVm2l5V5OL3KS2W+8u262dfXrJ7Tmekuj1UpuSXnwV0+K3xYB1lSRoqSOGwXSqpClCmoKUo5Kbb9H6qstttm3cjJ9KcQs5U4W/kqR8XI6DrakjVTxGq+vaUuB6RU6llJaknxd4vql8SfUkcBZSrXV0RqlQgLHwhdSnFcnJIxWkKcso1It8NZX7gDfUqEaUhKRiAVGk6jpVqVeO1STfPV3dquj0qLurreebdIl5kcvrbd2x7e87jQGkKdalBwldxjGMk8pJpb12HQWYAAAAAAAAAAABrnBNNNXTVmuT3GwhY7GajirXu8+r59hCpOMI7UtPqJRi5OyKShejVlTl6L2P+mXuf6G7G0rPWWx7eTLDSmCVaCatrJXjLjyfJlXgcX/yqmTWWf8AS+Z81jMNuZbP8X2X8fdT0oT3i3i1XaXyUGnMZOUlQp3cpWTttetsh8f9TpNB9GqdGKlNKdTa5NXUXwgns69vVsKPobSVTFVar+prOPJzdl/l1l2nZVqp7+Ew8aFJQXr58Tzqk9uTZ9q1ivxWGpVmlOmpNO6ds1bPas7eBlUm27Layxw9FQXPe/ncaSBlTg0jGdJcX4Gc5kapVAI2JoPc+xlbGT1mmt2wsalUiuqk02r2ZwGGj9CQgsko9l5Prb2G+tgo22vtsyROvfMjVKoBzWmdCLNwSUuC9GXK25lZhMTiKurQg3fNX2Sstzb2JZnW4id0cy35LGU5LfUg31SerPv87vALbCdDFb95Uk3vUEku9p37kMX0Ogl5s5p/eSa8EjtZTSI1bECwPPPK1sNPUqpuO7O+XGL9xdQmmk07pq6ZN0xhI1oSjv2xfCW44/BY2rFeTgru7ys21xSXWAdHKKaaauntRT688JWjVp+i3Zxvk1vpv3P4GDrYtZuMrcPJx9yua6mlNeEoVI2dspK+UlsumAem4TExqQjODvGUU128eZIOU/2fYpyozg/qTuuUZq9u9SfadWdAAAAAAAAAAKSC8rOU36KyXu+PaS9LVrQ1Vtll2b/h2mVKgoQSbtxfN7TBim6kthaRzfx+/wDRop/hHa4vJfJEw9d03Z5wb7uf6GWlsLTlB1HJR1Vfym63B8fb7DCviU/NhHW7H/qcppXytatHCxdkpZq+Sla7k7eqvG5Rh/8A1i6NRbUfZfeHHu7iybcLVFlLr6GzoNiFGvUgs1ODs7P6runyyb8DqcVOzaN+idF06ENWC/mn9aT4t+7cZYtQe1e09WxjI2ileUpeqvF/on3llUmV+j0oqdnvXsM6lUAzqVSLUqmFSqaIyvJLmAb4U3LN5L2mNSlHh4s21KhFq1AD5rWVkaKlUxqVDS2AfZSOfxVeLxMXJ2hCcFJ2byi05ZLtLnEOdrQ2v6z2R583yIk9EQcNX623yj2358uQB3kHCUVKLUlJXUk8mnvRExFBPY2vE5LohpKVOpLDz2NvVXqzWbS5NJ9q5nU1KoBXyUlKz557iVhNGRim7at3dpZN3zu2a51iX9JurgGNXDU+HbdlDpnRMZrnunvXJ8UXFSqRatS4BTdCsb5GvKjNW8paN+E4a2qup3fgehHlmnG4VYVI7UlL/FB3T9nceoxd8wgZAA6AAAAAYTjdNPfkAUlWvKVXWita3oq19mx9+ZJhgJzd6kn/ACr5suwsaVNRVopJcjYY4YRa1He7vbhy4+vI0SrvSCtw8TVSoxirRSXzvZxPRN3xuIb9K1V99WNzuzz/AElfCY7ytnqVG5dcZ/xF1qWduria0klZGdu53FetZFTia5uxE9aKlB60WrprPJ70U9arcAk4TE2k1uftWz3m+pVKq5tdYA21KphQqecn855Gls+AFhUqEWpUMXUMAAfAAAAY1qqinKTslvAKWs7YuDX2lLx1U/A7SnTvm9ntOM0LTdbEa72KV3y3RXzwO2qVADCcI8ER20th9qVCJUqAGVSqaZSPjNdbWtaNk39Z52523sAodN1VKrZ7IpJ228XbnnbsPStG46nWgp03eLytvT3xa3M4yGjqag4tXvm5P0m/WvxI/RrFyw+JVNvzKjUHwz9CfXdpdrAPRwAdAAAAAAAAAAK7TGi4V4ak8ntjNbYviuXFFiADzvyOMwTaUdene90nKHXlnB93aff98Xvoxv8A9z+09DMXBcF3AHnj6Xf9Ffmf2mD6VP7Jfj/tPRfJR4LuRS6Vp6k7pK01Z5Lqa9hTXq7qO1a6LKVPeS2bnIvpO/so/j/QwfSR/Zx/F+h6Jg8MowitVXtnktrzZv8AJx4LuRZG7SbViDVnkeZPpBL1F+Jnz9vv1I/iZbdL8LKhiKeJgspON+GvFW1XylFeDL6lXhXpqpSs09qsrp74vg0dOHF/t9+pH8TH7fl6i/Ezo69N39B/hNPkX6v+UAoHp6W6Ee9s+KhXrtOV1Hi1aK6lv+czo43X1fAxafBgGrAUY0lFR2J3b3t72yzqVCBYy1mAZ1KhqB8AAAABRaY/j07bbQ79Z2LqtVjFOUnZLf7iv6O4aWIxSqNeZTam+Wr6EettLuYB6QADoAAAAAAAAAAAAAAABHxGHUtW+6Sf6EgEZRUlZnU2ndAAEjhHxmFhUhKE1rRkrNe/k+ZxWK6OYnDzc8NJyjya1rcJReUuzuR3oAPPf23jVlKg786NVMxenMX9h/6qvxPRAAecvTGL+wf5VUwelcV9i/yqh6SADzR6RxX2L/JqGDx2K+xl+TUPTgAeYfTMV9jL8moPpmK+xl+TUPTwAeYfTMV9jL8moPpeKeyjLsozPTwAec4Po7iq8k6t4R9aeT/wwW/rsdxozR1OhTVOCy2tvbJ75SfEnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//Z)', backgroundSize: 'cover', height: '200px' }}>
                              <p style={{ color: 'white', textAlign: 'center', padding: '10px' }}>Nuvoloso!</p>
                            </div>
                          ) : item.weather[0].main.toLowerCase() === 'clear sky' ? (
                            <div style={{ backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC3lAuqnxdsxHwk-aM_KM5dFUchV6Dj5XC2w&usqp=CAU)', backgroundSize: 'cover', height: '200px' }}>
                              <p style={{ color: 'white', textAlign: 'center', padding: '10px' }}>Sereno!</p>
                            </div>
                          ) : (
                            // Aggiungi altri blocchi else if per gestire ulteriori condizioni
                            <div style={{ backgroundImage: 'url(URL_immagine_generica)', backgroundSize: 'cover', height: '200px' }}>
                              <p style={{ color: 'white', textAlign: 'center', padding: '10px' }}>Altro tipo di condizione</p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Caricamento previsioni...</p>
      )}
    </div>
  )}
export default Previsioni;
