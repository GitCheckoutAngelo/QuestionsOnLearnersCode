import ast
from pathlib import Path
from configparser import ConfigParser

from questions.QuestionGenerator import QuestionGenerator
from questions.QuestionSeries import QuestionSeries
from questions.FunctionNameQuestion import FunctionNameQuestion 
from questions.FunctionParameterListQuestion import FunctionParameterListQuestion

def main():
    # read config file
    config_file_path = Path(__file__).with_name('config.ini')
    config_object = ConfigParser()
    config_object.read(config_file_path)

    # get path to python file
    file_info = config_object["FILEINFO"]
    file_name = file_info["name"]
    python_file_path = Path(__file__).with_name(file_name)

    # read python file as AST
    with open(python_file_path, "r") as source:
        tree = ast.parse(source.read())

    # analyze AST contents
    analyzer = Analyzer()
    analyzer.visit(tree)

    # generate questions
    question_generator = QuestionGenerator(analyzer.stats)
    q1 = question_generator.generate_question(FunctionNameQuestion)
    q2 = question_generator.generate_question(FunctionParameterListQuestion)

    # ask questions
    question_series = QuestionSeries([q1,q2])
    question_series.start()
    print(question_series.get_score())

class Analyzer(ast.NodeVisitor):
    def __init__(self):
        self.stats = {"functionDef": []}

    def visit_FunctionDef(self, node):
        self.stats["functionDef"].append(node)

if __name__ == "__main__":
    main()