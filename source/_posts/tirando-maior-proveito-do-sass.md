---
title: Tirando maior proveito do SASS
tags:
  - SASS
  - CSS
date: 2016-08-21 21:13:51
---


Que os pré-processadores facilitam nossa vida na hora de criar as nossas interfaces já não é novidade, o uso deles já é bem comum mesmo em aplicações pequenas. Mas mesmo sabendo de suas amplas funcionalidades as vezes acabamos usando apenas as mais simples, aninhamento de seletores, **$variáveis**, **@mixins**, **%placeholders**.

Nesse posts vou abordar outras funcionalidades muito úteis que podemos tirar mais proveito quando utilizamos SASS, como **@function**, **@each**, **@if**, **map**, **map-get**, **darken**, **lighten**.

## Darken e Lighten

Podemos começar com os mais simples, o darken e o lighten tem muito em comum, são funções que recebem dois parâmetros, o primeiro é uma cor, e o segundo um valor  que irá alterar essa cor do primeiro parâmetro.

A diferença é que o lighten irá deixar essa cor mais clara enquanto o darken mais escura.

```scss
$red: #FF0000;

.box {
  color: darken($red, 20%);
  background-color: lighten($red, 20%);
}
```

Essas funções são muito úteis na hora de criar sombras, como no caso de criar botões:

```scss
$red: #FF0000;

.btn--red {
  background-color: $red;
  box-shadow: inset 0 1px 1px 1px lighten($red, 40%); 
  border-bottom: 3px solid darken($red, 10%);
}
```

## Map
Antes de ir para o tópico **@each**, vamos a uma breve introdução aos mapas com SASS, eles são bons na criação de regras iniciais do projeto, como configurar cores, fontes e breakpoints, podemos pegar como exemplo a definição das cores do projeto.

Ao invés de criar uma variável para cada cor, podemos criar uma coleção se cores, um mapa com  chave e valor correspondente a cada cor que precise ser criada armazenado em uma variável.

```scss
$color: (
  red: #FF0000,
  green: #00FF00,
  blue: #0000FF
);
```
Agora para buscar as cores basta usar a função nativa do SASS **map-get()** que recebe dois parâmetros, o primeiro é o mapa, que no caso é **$color** e o segundo parâmetro é a chave correspondente a cor que você deseja.

```scss
.elemento {
  color: map-get($color, red);
}
```
Resultado:

```scss
.elemento {
  color: #FF0000;
}
```

## Each
 
O **@each** é excelente em economizar tempo automatizando tarefas repetidas, é muito útil para criar muitas classes com as mesmas propriedades mas com valores diferentes.

Na criação dos principais componentes da sua aplicação como os botões e suas variações é um ótimo caso para se usar um each, aqui também vemos um dos benefícios de usar os mapas, usando o mesmo mapa do exemplo anterior vamos a criação dessas variações de botões.

```scss
$color: (
  red: #FF0000,
  green: #00FF00,
  blue: #0000FF
);

@each $btnType, $btnColor in $color {
  .btn--#{$btnType} {
    background-color: $btnColor;
    box-shadow: inset 0 -1px 1px 0px lighten($btnColor, 20%); 
    border-bottom: 3px solid darken($btnColor, 10%);
  }
}
```

Para o uso de variáveis em seletores e propriedades é preciso fazer a interpolação das mesmas, para isso é usada a sintax **#{$variavel}** como se pode perceber na linha **8** do exemplo acima.

Esse **@each** vai percorrer o mapa **$color** resgatar chave e valor e criar um botão para cara item. Isso vai resultar em três classes.

```css
.btn--red {
  background-color: #FF0000;
  box-shadow: inset 0 -1px 1px 0px #ff6666;
  border-bottom: 3px solid #cc0000;
}

.btn--green {
  background-color: #00FF00;
  box-shadow: inset 0 -1px 1px 0px #66ff66;
  border-bottom: 3px solid #00cc00;
}

.btn--blue {
  background-color: #0000FF;
  box-shadow: inset 0 -1px 1px 0px #6666ff;
  border-bottom: 3px solid #0000cc;
}
```


## If
O **@if** é muito útil na hora de criar functions, eachs, e mixins que em alguns casos precisa demonstrar um comportamento diferente, ao invés que criar um outro mixin você pode apenas inserir uma condição dentro desse bloco para que esse comportamento seja adicionado ou não.

Usando o exemplo do **@each** acima, digamos que apenas um dos botões precise receber um comportamento diferente, ainda assim podemos seguir com o mesmo código, basta adicionar um **@if** para identificar esse botão.

```scss
$color: (
  red: #FF0000,
  green: #00FF00,
  blue: #0000FF
);

@each $name, $btnColor in $color {
  .btn--#{$name} {
    background-color: $btnColor;
    box-shadow: inset 0 -1px 1px 0px lighten($btnColor, 20%); 
    border-bottom: 3px solid darken($btnColor, 10%);
    
    @if $name == red {
      color: #FFFFFF;
    }
  }
}
```
Na linha **11** é adicionado essa condição que compara a chave do mapa, se **$name** que são as chaves do mapa **$color** for igual a **red** então a linha **14** é adicionada. Resultado:

```css
.btn--red {
  background-color: #FF0000;
  box-shadow: inset 0 -1px 1px 0px #ff6666;
  border-bottom: 3px solid #cc0000;
  color: #FFFFFF;
}

.btn--green {
  background-color: #00FF00;
  box-shadow: inset 0 -1px 1px 0px #66ff66;
  border-bottom: 3px solid #00cc00;
}

.btn--blue {
  background-color: #0000FF;
  box-shadow: inset 0 -1px 1px 0px #6666ff;
  border-bottom: 3px solid #0000cc;
}


```

## Function

A diretiva **@function** no SASS é útil pra que cada vez menos a gente precisa repetir códigos, no CSS há muitas operações que precisamos que podem ser transformadas em funções, como transformar medidas de fontes fixas em relativas.

```scss
@function rem($px) {
  @return ($px/16) + rem;
}

.btn {
  font-size: rem(32);
}
```

Há muito para se aproveitar dessa e de muitas outras funções que o SASS tem, podemos usar essas funções em coisas extremamente simples mas que podem economizar muito tempo, e tempo é dinheiro não é verdade?!

Tudo depende de como e quando você vai usar cada feature que o SASS pode te oferecer, quando a expectativa do projeto é crescer constantemente é ótimo ter algo desse tipo, vai facilitar muito na hora de implementar mudanças ou novas variações nos componentes que já existem.

No site do SASS tem muitas outras coisas interessantes que valem a pena ser consideradas, caso tenha interesse você pode acessar o [Guide](http://sass-lang.com/guide) ou a [Documentação](http://sass-lang.com/documentation/file.SASS_REFERENCE.html).