const gameLinks = {
      "AFB GAMING": "https://warisanbola.site",
      "PRAGMATIC PLAY": "https://warisanbola.site",
      "PG-SOFT": "https://warisanbola.site",
      "JDB": "https://warisanbola.site",
      "HABANERO": "https://warisanbola.site",
      "MM-GAMING": "https://warisanbola.site"
    };

    const gameData = {
      "PRAGMATIC PLAY": ["Starlight Princess", "Gates of Olympus", "Sugar Rush", "Wild West Gold", "Bonanza Gold"],
      "PG-SOFT": ["Mahjong Ways", "Lucky Neko", "Fortune Tiger", "Candy Burst", "Ways of the Qilin"],
      "JDB": ["Dragon King", "Super Rich", "Lucky Crown", "Golden Disco", "Money Nights"],
      "HABANERO": ["Hot Hot Fruit", "Fa Cai Shen", "Wild Trucks", "London Hunter", "Santa's Village"],
      "AFB GAMING": ["Gold Volcano", "Maneki Neko", "Lucky Frog", "Wallow In Money", "Safari"],
      "MM-GAMING": ["Plinko", "Fishing War", "Squid Game", "Hi-Lo", "Candy Boom"]
    };

    const labels = Object.keys(gameData);
    const dataValues = [95.35, 89.75, 75.35, 91.35, 82.75, 70.90];
    const colors = ['#00ccff', '#29d7ff', '#32aaff', '#5d6dff', '#8a66ff', '#ff4dd2'];

    new Chart(document.getElementById('barChart'), {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Distribusi Game (%)',
          data: dataValues,
          backgroundColor: colors,
          barPercentage: 0.6,
          categoryPercentage: 0.7
        }]
      },
      options: {
        responsive: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });

    function goTo(provider) {
      if (gameLinks[provider]) {
        window.open(gameLinks[provider], '_blank');
      }
    }

    function handleGo() {
      const userId = document.getElementById('userId').value.trim();
      const saldo = document.getElementById('saldo').value;
      const resultDiv = document.getElementById('result');
      const notification = document.getElementById('notification');

      resultDiv.innerHTML = '';
      notification.textContent = '';

      if (!userId || !saldo) {
        notification.textContent = 'Silakan isi User ID dan pilih saldo!';
        return;
      }

      const lastClickTimeKey = `lastClickTime_${userId}`;
      const now = Date.now();
      const lastClick = localStorage.getItem(lastClickTimeKey);

      if (lastClick && now - parseInt(lastClick) < 6 * 60 * 60 * 1000) {
        notification.textContent = 'Back in 6 hours, Game Options That Previously Had Jackpot Potential on Your ID';
        return;
      }

      localStorage.setItem(lastClickTimeKey, now.toString());

      resultDiv.innerHTML = '<p>WAIT FOR GAME RECOMMENDATIONS...</p>';

      setTimeout(() => {
        const selectedProvider = labels[Math.floor(Math.random() * labels.length)];
        const selectedGames = [...gameData[selectedProvider]].sort(() => 0.5 - Math.random()).slice(0, 5);

        resultDiv.innerHTML = `
        <div style="background-color:#121212;padding:15px;border-radius:10px;box-shadow:0 0 10px rgba(0,204,255,0.3);">
          <p style="color:#ff4dd2;font-weight:bold;margin-bottom:10px;">${selectedProvider}</p>
          <ul class="centered-list" style="font-size:16px;line-height:1.6;">
            ${selectedGames.map((game, index) => {
              const colors = ['#00ccff','#29d7ff','#32aaff','#5d6dff','#8a66ff','#ff4dd2'];
              return `<li style='margin:5px 0;color:${colors[index % colors.length]};'>${game}</li>`;
            }).join('')}
          </ul>
          <p style="margin-top:10px;"><a href="${gameLinks[selectedProvider]}" style="font-weight:bold;text-decoration:none;color:#ffffff;" target="_blank">GO TO PROVIDER GAME</a></p>
        </div>`;

        notification.textContent = `GOOD LUCK, WIN THE JACKPOT IN THESE 5 GAMES!\nKLAIM WIN CODE ON WHATSAPP`;
      }, 2000);
    }