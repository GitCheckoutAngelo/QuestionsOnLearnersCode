import random
from lib.qlc_generator.questions.Question import Question
from lib.qlc_generator.answers.Answer import Answer
from lib.qlc_generator.util.AstUtil import AstUtil

# NOTE: This assumes there is at least 1 function definition in the input Python program 
class FunctionParameterListQuestion(Question):
    def __init__(self, astUtil: AstUtil):

        super().__init__(astUtil)

    def select_node(self):
        self.node =  random.choice(self.astUtil.getFunctionDefNodes())
    
    def generate_correct_answer(self):
        self.correct_answer = Answer(AstUtil.get_parameter_list(self.node).__str__(), True)
    
    def generate_distractors(self):
        distractorPool = []

        # name of this function
        distractorPool.append(Answer(self.node.name, False))

        # variables associated with this function
        if AstUtil.get_variable_list(self.node):
          distractorPool.append(Answer(AstUtil.get_variable_list(self.node).__str__(), False))

        # parameter lists of other functions
        for function in self.astUtil.getFunctionDefNodes():
            if AstUtil.get_parameter_list(function):
              if (AstUtil.get_parameter_list(function) != AstUtil.get_parameter_list(self.node)):
                distractorPool.append(Answer(AstUtil.get_parameter_list(function).__str__(), False))

        self.distractor_pool = distractorPool
    
    def create_question_text(self):
        self.text = "Which are the parameter names of the function on line " + str(self.node.lineno) + "?"