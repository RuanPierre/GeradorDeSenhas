def potencia(num, p):

    numero = num

    for i in range(1, p):
        numero *= num
    
    return numero

soma = 0
noventaSeteFatorial = 96192759682482119853328425949563698712343813919172976158104477319333745612481875498805879175589072651261284189679678167647067832320000000000000000000000
    
for i in range(1, 101):
    soma += potencia(97, i)
    if soma > noventaSeteFatorial:
        print(i)
        break

print(soma)

