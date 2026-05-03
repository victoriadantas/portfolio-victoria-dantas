// Função para validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Função para validar formulário
function validarFormulario(event) {
    event.preventDefault(); // Impede o envio padrão

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();
    const erroDiv = document.getElementById('mensagem-erro');

    // Limpar mensagens de erro anteriores
    erroDiv.style.display = 'none';
    erroDiv.textContent = '';

    // Verificar se todos os campos estão preenchidos
    if (!nome || !email || !mensagem) {
        erroDiv.textContent = 'Por favor, preencha todos os campos.';
        erroDiv.style.display = 'block';
        return;
    }

    // Validar formato do email
    if (!validarEmail(email)) {
        erroDiv.textContent = 'Por favor, insira um email válido.';
        erroDiv.style.display = 'block';
        return;
    }

    // Se válido, limpar formulário e mostrar sucesso
    document.getElementById('form-contato').reset();
    alert('Mensagem enviada com sucesso!');
}

// Adicionar evento de submit ao formulário
document.getElementById('form-contato').addEventListener('submit', validarFormulario);

// Função para destacar seção ativa no menu
function destacarSecaoAtiva() {
    const secoes = document.querySelectorAll('section');
    const links = document.querySelectorAll('.menu-link');

    // Remover classe active de todos os links
    links.forEach(link => link.classList.remove('active'));

    // Verificar qual seção está visível
    secoes.forEach(secao => {
        const rect = secao.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) { // Ajuste para considerar o menu fixo
            const link = document.querySelector(`a[href="#${secao.id}"]`);
            if (link) {
                link.classList.add('active');
            }
        }
    });
}

// Adicionar evento de scroll para destacar seção ativa
window.addEventListener('scroll', destacarSecaoAtiva);

// Chamar uma vez no carregamento
destacarSecaoAtiva();

// Função para animar contadores
function animarContadores() {
    const counters = document.querySelectorAll('.number');
    const speed = 200; // Velocidade da animação

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / speed;

        const updateCount = () => {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
}

// Intersection Observer para animações
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animação especial para números
            if (entry.target.id === 'numeros') {
                animarContadores();
            }
        }
    });
}, observerOptions);

// Observar todas as seções com fade-in
document.querySelectorAll('.fade-in').forEach(section => {
    observer.observe(section);
});