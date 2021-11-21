# NODEJS2021Q4 

TASK 1

CLI tool accepts 3 options (short alias and full name):

-c, --config: config for ciphers Config is a string with pattern {XY(-)}n, where:
    X is a cipher mark:
        C is for Caesar cipher (with shift 1)
        A is for Atbash cipher
        R is for ROT-8 cipher
    Y is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
        1 is for encoding
        0 is for decoding
-i, --input: a path to input file (without this option you will have to type text in console)
-o, --output: a path to output file (without this option the result will be shown in console)

For example, config "C1-C1-R0-A" means "encode by Caesar cipher => encode by Caesar cipher => decode by ROT-8 => use Atbash"

Examples of launching:
node .\my_ciphering_cli --config C1-R1 --input "./input.txt" --output "./output.txt"
node .\my_ciphering_cli -c C1-R1 -i "./input.txt" -o "./output.txt"
node .\my_ciphering_cli -c C1-R1 --output "./output.txt"
node .\my_ciphering_cli -c C1-R1 -i "./input.txt"
node .\my_ciphering_cli -c C1-R1